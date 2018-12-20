import * as React from 'react'

import { BoxProps } from './iBox'

export default class Box extends React.Component<BoxProps, any> {
	public props: BoxProps
	public state: {

	}
	constructor(props) {
		super(props)
	}

	public render() {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}
