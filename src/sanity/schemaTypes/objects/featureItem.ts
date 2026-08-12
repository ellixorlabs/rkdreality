import {defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'

export const FEATURE_ICON_OPTIONS = [
  {title: 'Sewage / drainage', value: 'sewage'},
  {title: 'Water tank', value: 'tank'},
  {title: 'Borewell / tap', value: 'borewell'},
  {title: 'Site demarcation', value: 'signpost'},
  {title: 'Electricity', value: 'electricity'},
  {title: 'Roads', value: 'road'},
  {title: 'Gated entry', value: 'gate'},
  {title: 'Street lighting', value: 'lighting'},
  {title: 'Security', value: 'security'},
  {title: 'Drainage', value: 'drainage'},
  {title: "Children's park", value: 'park'},
  {title: 'Outdoor gym', value: 'gym'},
  {title: 'Greenery / trees', value: 'trees'},
  {title: 'Benches', value: 'bench'},
  {title: 'Sports / cricket', value: 'sports'},
  {title: 'Clubhouse', value: 'clubhouse'},
  {title: 'Walking track', value: 'walk'},
  {title: 'Temple / shrine', value: 'temple'},
  {title: 'Parking', value: 'parking'},
  {title: 'Rainwater harvest', value: 'rain'},
]

export const featureItem = defineType({
  name: 'featureItem',
  title: 'Feature item',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {list: FEATURE_ICON_OPTIONS, layout: 'dropdown'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'icon'},
  },
})
