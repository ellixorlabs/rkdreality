import {defineArrayMember, defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'
import {AMENITY_OPTIONS, FACILITY_OPTIONS} from '../data/propertyFeatures'

export const property = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'details', title: 'Details', default: true},
    {name: 'media', title: 'Media'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location / Locality',
      type: 'string',
      group: 'details',
      description: 'e.g. "Off Nelamangala–Tumkur Road"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      group: 'details',
      options: {
        list: [
          {title: 'Bangalore', value: 'Bangalore'},
          {title: 'Mysore', value: 'Mysore'},
          {title: 'Nelamangala', value: 'Nelamangala'},
          {title: 'Devanahalli', value: 'Devanahalli'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'propertyType',
      title: 'Property type',
      type: 'string',
      group: 'details',
      options: {
        list: [
          {title: 'Residential Plots', value: 'Residential Plots'},
          {title: 'Commercial Land', value: 'Commercial Land'},
          {title: 'Joint Venture', value: 'Joint Venture'},
          {title: 'Farm Land', value: 'Farm Land'},
          {title: 'Farm Plots', value: 'Farm Plots'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Availability status',
      type: 'string',
      group: 'details',
      options: {
        list: [
          {title: 'Available', value: 'Available'},
          {title: 'Few Plots Left', value: 'Few Plots Left'},
          {title: 'Sold Out', value: 'Sold Out'},
        ],
        layout: 'radio',
      },
      initialValue: 'Available',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceLabel',
      title: 'Price label',
      type: 'string',
      group: 'details',
      description: 'Displayed text, e.g. "₹38.5 L onwards" or "₹1000/sqft Onwards"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceFrom',
      title: 'Starting price (₹ lakhs)',
      type: 'number',
      group: 'details',
      description: 'Numeric value used for filtering and sorting (in lakhs).',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'sizeLabel',
      title: 'Plot size label',
      type: 'string',
      group: 'details',
      description: 'e.g. "1,200 – 2,400 sq.ft"',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      group: 'details',
      of: [defineArrayMember({type: 'string'})],
      description: 'Short badges, e.g. "BMRDA Approved", "Clear Title".',
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'appreciation',
      title: 'Appreciation note',
      type: 'string',
      group: 'details',
      description: 'e.g. "~14% p.a. corridor growth"',
    }),
    defineField({
      name: 'approvalsLabel',
      title: 'Approvals',
      type: 'string',
      group: 'details',
      description:
        'Shown in the facts strip. Type custom text, e.g. "RERA Certified", "BMRDA Approved", "RERA · BDA".',
    }),
    defineField({
      name: 'overview',
      title: 'Overview / Description',
      type: 'array',
      group: 'details',
      description: 'Long-form description shown on the property detail page. One entry per paragraph.',
      of: [defineArrayMember({type: 'text'})],
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities (legacy tags)',
      type: 'array',
      group: 'details',
      hidden: true,
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'facilities',
      title: 'Facilities (legacy cards)',
      type: 'array',
      group: 'details',
      hidden: true,
      of: [defineArrayMember({type: 'featureItem'})],
    }),
    defineField({
      name: 'amenityItems',
      title: 'Amenities (legacy cards)',
      type: 'array',
      group: 'details',
      hidden: true,
      of: [defineArrayMember({type: 'featureItem'})],
    }),
    defineField({
      name: 'facilityKeys',
      title: 'Our Facilities',
      type: 'array',
      group: 'details',
      description: 'Tick every infrastructure item this property actually has. Only checked items appear on the website.',
      of: [defineArrayMember({type: 'string'})],
      options: {list: [...FACILITY_OPTIONS], layout: 'grid'},
    }),
    defineField({
      name: 'amenityKeys',
      title: 'Our Amenities',
      type: 'array',
      group: 'details',
      description: 'Tick every lifestyle amenity this property actually has. Only checked items appear on the website.',
      of: [defineArrayMember({type: 'string'})],
      options: {list: [...AMENITY_OPTIONS], layout: 'grid'},
    }),
    defineField({
      name: 'locationHighlights',
      title: 'Location highlights',
      type: 'array',
      group: 'details',
      description: 'Connectivity & nearby landmarks, e.g. "8 km from NH-48".',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'mapUrl',
      title: 'Google Maps link',
      type: 'url',
      group: 'details',
      description: 'Optional. Link to the location on Google Maps.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'details',
      description: 'Highlight this property and surface it first.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      group: 'details',
      description: 'Lower numbers appear first. Leave blank to sort by date.',
    }),
    defineField({
      name: 'image',
      title: 'Cover image URL',
      type: 'url',
      group: 'media',
      description: 'Optional. Paste a direct image URL used as the card cover photo.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery image URLs',
      type: 'array',
      group: 'media',
      description: 'Paste direct image URLs. Shown in the swipeable lightbox gallery.',
      of: [defineArrayMember({type: 'url'})],
      validation: (rule) =>
        rule.custom((urls?: string[]) => {
          if (!urls) return true
          const invalid = urls.some((u) => !/^https?:\/\//.test(u))
          return invalid ? 'Every gallery item must be an http(s) URL' : true
        }),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube video link (legacy)',
      type: 'url',
      group: 'media',
      hidden: true,
      readOnly: true,
      description: 'Deprecated. Use YouTube videos field below.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'youtubeUrls',
      title: 'YouTube videos',
      type: 'array',
      group: 'media',
      description:
        'Add one or more YouTube links (watch, youtu.be, embed, or shorts). Each link appears on the property page.',
      of: [
        defineArrayMember({
          type: 'url',
          validation: (rule) => rule.uri({scheme: ['http', 'https']}),
        }),
      ],
      options: {
        layout: 'list',
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social',
      type: 'seo',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Newest first',
      name: 'createdDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'city', status: 'status'},
    prepare({title, subtitle, status}) {
      return {
        title,
        subtitle: [subtitle, status].filter(Boolean).join(' · '),
      }
    },
  },
})
