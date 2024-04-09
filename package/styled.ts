import { defineComponent, DefineSetupFnComponent, h, inject, onMounted, PropType, PublicProps, SlotsType, useSlots, watch } from 'vue'
import domElements, { type SupportedHTMLElements } from '@/constants/domElements'
import {
  type ExpressionsType,
  generateClassName,
  generateComponentName,
  insertExpressions,
  isStyledComponent,
  isVueComponent
} from '@/utils'
import { isValidElementType } from '@/utils/validate'
import { injectStyle } from '@/injectStyle'

interface IProps {
  as?: SupportedHTMLElements
}

type ComponentCustomProps = PublicProps & {
  styled: boolean
}

export type StyledComponentType = DefineSetupFnComponent<IProps, any, SlotsType, any, ComponentCustomProps>

type StyledFactory = (styles: TemplateStringsArray, ...expressions: ExpressionsType) => StyledComponentType
type StyledComponent = StyledFactory & {
  attrs: <T extends Record<string, unknown>>(attrs: T) => StyledFactory
}
type Attrs = Record<string, unknown>

function baseStyled(target: string | InstanceType<any>, propsFromFactory: Record<string, unknown> = {}): StyledComponent {
  if (!isValidElementType(target)) {
    throw Error('The element is invalid.')
  }
  let attributes: Attrs = {}
  const styledComponent: StyledComponent = function styledComponent(
    styles: TemplateStringsArray,
    ...expressions: ExpressionsType
  ): StyledComponentType {
    const cssStringsWithExpression = insertExpressions(styles, expressions)
    return createStyledComponent(cssStringsWithExpression)
  }
  styledComponent.attrs = function <T extends Record<string, unknown>>(attrs: T): StyledComponent {
    attributes = attrs
    return styledComponent
  }

  function createStyledComponent(cssWithExpression: ExpressionsType): StyledComponentType {
    let type: string = target
    if (isVueComponent(target)) {
      type = 'vue-component'
    }
    if (isStyledComponent(target)) {
      type = 'styled-component'
    }

    const componentName = generateComponentName(type)
    return defineComponent(
      (props) => {
        const theme = inject<Record<string, string | number>>('$theme') || {}
        const context = {
          ...propsFromFactory,
          theme,
          ...attributes
        }

        // Generate a unique class name
        const className = generateClassName()
        if (attributes?.class) {
          attributes.class += ` ${className}`
        } else {
          attributes.class = className
        }

        watch(theme, () => {
          injectStyle(className, cssWithExpression, context)
        })

        onMounted(() => {
          injectStyle(className, cssWithExpression, context)
        })

        // Return the render function
        return () => {
          const slot = useSlots()
          return h(
            isVueComponent(target) ? target : props?.as || target,
            {
              ...attributes
            },
            slot
          )
        }
      },
      {
        name: componentName,
        props: {
          as: {
            type: String as PropType<SupportedHTMLElements>
          }
        },
        inheritAttrs: true,
        styled: true
      } as any
    )
  }

  return styledComponent
}

/** Append all the supported HTML elements to the styled properties */
const styled = baseStyled as typeof baseStyled & {
  [E in SupportedHTMLElements]: StyledComponent
}

domElements.forEach((domElement: SupportedHTMLElements) => {
  styled[domElement] = baseStyled(domElement)
})

export { styled }
