import * as React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import SimpleCard from './SimpleCard'
import { ContextInterface } from './Context'

let mockContext: ContextInterface = {}
jest.mock('./Context', () => ({
  ContextConsumer: (props: { children: (context: ContextInterface) => {} }) => {
    return props.children(mockContext)
  },
}))

describe('SimpleCard', () => {
  beforeEach(() => {
    mockContext = {}
  })

  describe('DOM attributes', () => {
    it('should render the form id placeholder', () => {
      mockContext = { formId: 'my-form' }
      const wrapper = mount(<SimpleCard />)
      expect(wrapper.find(`#${mockContext.formId}-sq-card`)).to.be.length(1)
    })
  })
})
