import { writable } from 'svelte/store';

export const selectedOrder = writable({
	id: 119525,
	parent_id: 0,
	status: 'on-hold',
	currency: 'COP',
	version: '7.9.0',
	prices_include_tax: true,
	date_created: '2023-12-04T19:53:48',
	date_modified: '2023-12-05T09:50:29',
	discount_total: '0',
	discount_tax: '3656',
	shipping_total: '5000',
	shipping_tax: '0',
	cart_tax: '0',
	total: '24244',
	total_tax: '0',
	customer_id: 1,
	order_key: 'wc_order_gdNV9dkHVaHnY',
	billing: {
		first_name: 'Esteban',
		last_name: 'Jimenez',
		company: '1088273548',
		address_1: 'Calle 48 #19-100 Paseo La castellana Local 30',
		address_2: '',
		city: 'Pereira',
		state: 'RIS',
		postcode: '',
		country: 'CO',
		email: 'davelauren.gerencia@gmail.com',
		phone: '3108472194'
	},
	shipping: {
		first_name: 'David',
		last_name: 'Gomez',
		company: '1088273548',
		address_1: 'Calle 48 #19-100 Paseo La castellana Local 30',
		address_2: '',
		city: 'Pereira',
		state: 'RIS',
		postcode: '',
		country: 'CO',
		phone: '3108472194'
	},
	payment_method: 'cod',
	payment_method_title: 'Pago contra entrega',
	transaction_id: '',
	customer_ip_address: '186.83.184.130',
	customer_user_agent:
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
	created_via: 'checkout',
	customer_note: '',
	date_completed: null,
	date_paid: null,
	cart_hash: '18744fc58976346f937ca33d04def07b',
	number: '119525',
	meta_data: [
		{
			id: 2757069,
			key: '_billing_id',
			value: '1088273548'
		},
		{
			id: 2757070,
			key: 'is_vat_exempt',
			value: 'no'
		},
		{
			id: 2757072,
			key: '_ga_tracked',
			value: '1'
		},
		{
			id: 2757083,
			key: 'svc_shippingInfo',
			value: {
				dateShipped: '2023-06-30',
				trackingId: 7777755553333,
				shippingProvider: 'Coordinadora'
			}
		},
		{
			id: 2757084,
			key: 'svc_invoice',
			value: {
				dateInvoiced: '2023-06-30',
				invoiceNumber: 12334
			}
		}
	],
	line_items: [
		{
			id: 308463,
			name: 'testaddddd - AMARILLO, 9',
			product_id: 119430,
			variation_id: 119448,
			quantity: 1,
			tax_class: '',
			subtotal: '19244',
			subtotal_tax: '3656',
			total: '19244',
			total_tax: '0',
			taxes: [
				{
					id: 2,
					total: '0',
					subtotal: '3656.302521'
				}
			],
			meta_data: [
				{
					id: 2757069,
					key: '_billing_id',
					value: '1088273548'
				},
				{
					id: 2757070,
					key: 'is_vat_exempt',
					value: 'no'
				},
				{
					id: 2757072,
					key: '_ga_tracked',
					value: '1'
				},
				{
					id: 2757083,
					key: 'svc_shippingInfo',
					value: {
						date: '2023-06-30',
						shippingStatus: 'enviado',
						trackingId: 7777755553333,
						shippingProvider: 'Coordinadora'
					}
				},
				{
					id: 2757084,
					key: 'svc_invoice',
					value: {
						dateInvoiced: '2023-06-30',
						invoiceNumber: 12334
					}
				}
			],
			sku: '31030-2-AMARILLO -9-',
			price: 19243.697479,
			image: {
				id: 119393,
				src: 'https://woocommerce-831138-3583701.cloudwaysapps.com/wp-content/uploads/2023/11/31030-2.jpg'
			},
			parent_name: 'testaddddd'
		}
	],
	tax_lines: [
		{
			id: 308465,
			rate_code: 'CO-IMPUESTO-1',
			rate_id: 2,
			label: 'Impuesto',
			compound: false,
			tax_total: '0',
			shipping_tax_total: '0',
			rate_percent: 19,
			meta_data: []
		}
	],
	shipping_lines: [
		{
			id: 308464,
			method_title: 'Envío Urbano',
			method_id: 'legacy_advanced_shipping',
			instance_id: '0',
			total: '5000',
			total_tax: '0',
			taxes: [
				{
					id: 2,
					total: '',
					subtotal: ''
				}
			],
			meta_data: [
				{
					id: 3759808,
					key: 'Artículos',
					value: 'testaddddd - AMARILLO, 9 &times; 1',
					display_key: 'Artículos',
					display_value: 'testaddddd - AMARILLO, 9 &times; 1'
				}
			]
		}
	],
	fee_lines: [],
	coupon_lines: [],
	refunds: [],
	payment_url:
		'https://woocommerce-831138-3583701.cloudwaysapps.com/finalizar-compra/order-pay/119525/?pay_for_order=true&key=wc_order_gdNV9dkHVaHnY',
	is_editable: true,
	needs_payment: false,
	needs_processing: true,
	date_created_gmt: '2023-12-05T00:53:48',
	date_modified_gmt: '2023-12-05T14:50:29',
	date_completed_gmt: null,
	date_paid_gmt: null,
	currency_symbol: '$',
	_links: {
		self: [
			{
				href: 'https://woocommerce-831138-3583701.cloudwaysapps.com/wp-json/wc/v3/orders/119525'
			}
		],
		collection: [
			{
				href: 'https://woocommerce-831138-3583701.cloudwaysapps.com/wp-json/wc/v3/orders'
			}
		],
		customer: [
			{
				href: 'https://woocommerce-831138-3583701.cloudwaysapps.com/wp-json/wc/v3/customers/1'
			}
		]
	}
}); // Se guarda la info de un pedido en especifico
