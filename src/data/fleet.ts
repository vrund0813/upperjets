export interface FleetSpec {
  label: string
  value: string
}

export interface FleetAircraft {
  name: string
  category: string
  tag: string
  photos: string[]
  photoPosition: string
  specs: FleetSpec[]
  description: string
}

export const FLEET: FleetAircraft[] = [
  {
    name: 'Learjet 60',
    category: 'Mid-size jet',
    tag: 'Mid-size',
    photos: ['/images/UpperJets-16.jpg', '/images/UpperJets-02.jpg'],
    photoPosition: 'center 28%',
    specs: [
      { label: 'Passengers', value: 'Up to 8' },
      { label: 'Range', value: '2,400 nm' },
      { label: 'Speed', value: '465 ktas' },
      { label: 'Cabin height', value: '5\'10"' },
      { label: 'Baggage', value: '40 cu ft' },
      { label: 'Wi-Fi', value: 'Available' },
    ],
    description:
      'The Learjet 60 combines speed with a refined mid-size cabin. Cream leather seating, dark walnut accents, and seamless connectivity — ideal for transcontinental routes and regional charters across the Americas.',
  },
  {
    name: 'Falcon 50',
    category: 'Super mid-size jet',
    tag: 'Super mid-size',
    photos: ['/images/UpperJets-02.jpg', '/images/UpperJets-16.jpg'],
    photoPosition: 'center 25%',
    specs: [
      { label: 'Passengers', value: 'Up to 9' },
      { label: 'Range', value: '3,000 nm' },
      { label: 'Speed', value: '470 ktas' },
      { label: 'Cabin height', value: '5\'11"' },
      { label: 'Baggage', value: '85 cu ft' },
      { label: 'Wi-Fi', value: 'High-speed' },
    ],
    description:
      'Three-engine reliability with a wide stand-up cabin and transatlantic range. The Falcon 50 is the top choice for demanding business travel across the US and into South America.',
  },
  {
    name: 'Falcon 900',
    category: 'Heavy jet',
    tag: 'Heavy',
    photos: ['/images/UpperJets-16.jpg', '/images/UpperJets-02.jpg'],
    photoPosition: 'center',
    specs: [
      { label: 'Passengers', value: 'Up to 14' },
      { label: 'Range', value: '4,500 nm' },
      { label: 'Speed', value: '480 ktas' },
      { label: 'Cabin height', value: '6\'1"' },
      { label: 'Baggage', value: '115 cu ft' },
      { label: 'Wi-Fi', value: 'High-speed' },
    ],
    description:
      'For long-range missions and discerning clients. Capable of flying nonstop from Miami to Buenos Aires in unmatched large-cabin comfort. The flagship of the Upper Jets fleet.',
  },
]
