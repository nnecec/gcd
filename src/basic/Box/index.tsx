import * as React from 'react'

import { BoxProps } from './iBox'
import { BoxStyled } from './styled'



export default class Box extends React.Component<BoxProps, any> {
	public props: BoxProps
	public state: {

	}
	constructor(props) {
		super(props)
	}

	public render() {
		return (
			<BoxStyled>
				{this.props.children}
			</BoxStyled>
		)
	}
}
