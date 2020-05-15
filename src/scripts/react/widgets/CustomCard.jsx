import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Media, Badge, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

export default class CustomCard extends Component {
	constructor(props) {
		super(props)

		this.handelConvertColorCode = this.handelConvertColorCode.bind(this)
	}

	handelConvertColorCode(hemisphere, item) {
		let result = '#E9EBEE'
		let dateNow = new Date()

		let itemMonths = hemisphere == 'northern' ? item.northernMonths : item.southernMonths
		let itemHours = item.appearanceTime

		if (itemMonths.includes(dateNow.getMonth() + 1) && itemHours.includes(dateNow.getHours())) {
			result = '#42B72A'
		} else {
			result = '#FF0000'
		}

		if (item.chineseName == '') {
			result = '#E9EBEE'
		}

		return result
	}

	render() {
		return (
			<Media onClick={() => this.props.onClick()}>
				<FontAwesomeIcon
					icon={faCircle}
					style={{ position: 'absolute', fontSize: 'x-small', float: 'left', color: this.handelConvertColorCode(this.props.hemisphere, this.props.object) }}
				/>
				<Image
					style={{ width: '20%', maxWidth: '80px', margin: '5px 20px', backgroundColor: '#FFF8DC' }}
					src={this.props.object.imageURL}
					roundedCircle={true}
				/>
				<Media.Body>
					<h4>
						<span className={'font-weight-bold'} style={{ verticalAlign: 'middle' }}>{this.props.object.chineseName}</span>{' '}
						<Badge pill variant='secondary'>{'$ ' + this.props.object.price}</Badge>
					</h4>
					<p style={{ marginBottom: '0px' }}>
						{this.props.type == 'fish' ? this.props.object.shadowSize + ' / ' : ''}
						{this.props.object.location}
						{this.props.object.remark != '' ? <small><br />{'※ ' + this.props.object.remark}</small> : ''}
					</p>
				</Media.Body>
			</Media>
		)
	}
}

CustomCard.defaultProps = {
	type: 'bug',
	onClick: () => { },
	object: {
		imageURL: '',
		chineseName: '',
		englishName: '',
		price: 0,
		location: '',
		northernMonths: [],
		southernMonths: [],
		appearanceTime: [],
		remark: ''
	},
	hemisphere: 'northern'
}

CustomCard.propTypes = {
	type: PropTypes.string,
	onClick: PropTypes.func,
	object: PropTypes.object,
	hemisphere: PropTypes.string
}