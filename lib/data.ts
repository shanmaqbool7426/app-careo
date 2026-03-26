export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  originalPrice?: number;
  year: number;
  mileage?: number;
  condition: 'new' | 'used';
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  color: string;
  specs: {
    engine: string;
    power: string;
    torque: string;
    transmission: string;
    acceleration: string;
    topSpeed: string;
    fuelType: string;
    seats: number;
  };
  features: string[];
  location: string;
  city?: string;
  isNew?: boolean;
  discount?: number;
  isFavorite?: boolean;
  sellerName?: string;
  sellerPhone?: string;
  dealerId?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface Offer {
  id: string;
  title: string;
  discount: number;
  type: string;
  description: string;
  color: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  time: string;
  isMe: boolean;
  image?: string;
}

export interface Conversation {
  id: string;
  dealerName: string;
  dealerLogo: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  time: string;
  type: 'order' | 'topup';
  status: 'completed' | 'pending' | 'rejected';
  image?: string;
}

export interface Order {
  id: string;
  carName: string;
  carImage: string;
  price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  trackingId?: string;
}

export interface Review {
  id: string;
  carId: string;
  carName: string;
  carImage: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  pros: string[];
  cons: string[];
  brand: string;
}

export interface Dealer {
  id: string;
  name: string;
  logo: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  totalReviews: number;
  totalListings: number;
  verified: boolean;
  since: string;
  description: string;
  inventoryIds: string[];
}

export const brands: Brand[] = [
  { id: '1', name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/120px-Toyota_carlogo.svg.png' },
  { id: '2', name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/120px-Honda_Logo.svg.png' },
  { id: '3', name: 'Suzuki', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/120px-Suzuki_logo_2.svg.png' },
  { id: '4', name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/120px-BMW.svg.png' },
  { id: '5', name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/120px-Mercedes-Logo.svg.png' },
  { id: '6', name: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/120px-Audi-Logo_2016.svg.png' },
  { id: '7', name: 'Hyundai', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Hyundai_Motor_Company_logo.svg/120px-Hyundai_Motor_Company_logo.svg.png' },
  { id: '8', name: 'Kia', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Kia-logo.svg/120px-Kia-logo.svg.png' },
];

export const specialOffers: Offer[] = [
  { id: '1', title: 'Week Deal!', discount: 20, type: 'Special Offers', description: 'Get a car this week. Get the best car at the best price.', color: '#1a1a2e' },
  { id: '2', title: 'Top Deal!', discount: 10, type: 'Top Deals', description: 'Exclusive top deal on premium cars.', color: '#16213e' },
  { id: '3', title: 'New Arrivals', discount: 15, type: 'New Arrivals', description: 'Brand new models just arrived.', color: '#0f3460' },
  { id: '4', title: 'Black Friday', discount: 12, type: 'Black Friday', description: 'Massive savings this Black Friday.', color: '#1a1a1a' },
];

export const cars: Car[] = [
  {
    id: '1',
    name: 'Toyota Corolla 2024',
    brand: 'Toyota',
    model: 'Corolla',
    price: 28500,
    year: 2024,
    condition: 'new',
    rating: 4.7,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
    images: [
      'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
      'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    ],
    color: 'White',
    specs: { engine: '2.0L Dynamic Force', power: '169 hp', torque: '151 lb-ft', transmission: 'CVT', acceleration: '8.1s 0-60 mph', topSpeed: '115 mph', fuelType: 'Petrol', seats: 5 },
    features: ['Apple CarPlay', 'Android Auto', 'Lane Departure Alert', 'Adaptive Cruise', 'LED Headlights'],
    location: 'Karachi', city: 'Karachi', isNew: true, dealerId: '1', sellerName: 'Toyota City Motors',
  },
  {
    id: '2',
    name: 'Honda Civic 2024',
    brand: 'Honda',
    model: 'Civic',
    price: 32000,
    year: 2024,
    condition: 'new',
    rating: 4.6,
    reviews: 215,
    image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800',
    images: ['https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800'],
    color: 'Silver',
    specs: { engine: '1.5L VTEC Turbo', power: '192 hp', torque: '192 lb-ft', transmission: 'CVT', acceleration: '6.7s 0-60 mph', topSpeed: '137 mph', fuelType: 'Petrol', seats: 5 },
    features: ['Honda Sensing', 'Wireless CarPlay', 'Bose Sound System', 'Heated Seats', 'Sunroof'],
    location: 'Lahore', city: 'Lahore', isNew: true, dealerId: '2', sellerName: 'Honda Lahore',
  },
  {
    id: '3',
    name: 'Suzuki Swift 2024',
    brand: 'Suzuki',
    model: 'Swift',
    price: 14500,
    year: 2024,
    condition: 'new',
    rating: 4.3,
    reviews: 489,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'],
    color: 'Red',
    specs: { engine: '1.2L DualJet', power: '82 hp', torque: '88 lb-ft', transmission: '5-speed Manual', acceleration: '11.0s 0-60 mph', topSpeed: '105 mph', fuelType: 'Petrol', seats: 5 },
    features: ['Rear Camera', 'Touchscreen', 'Keyless Entry', 'Auto AC', 'USB Charging'],
    location: 'Islamabad', city: 'Islamabad', isNew: true, dealerId: '3', sellerName: 'Suzuki Pak Motors',
  },
  {
    id: '4',
    name: 'BMW M4 Competition',
    brand: 'BMW',
    model: 'M4',
    price: 145000,
    year: 2024,
    condition: 'new',
    rating: 4.9,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800', 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800'],
    color: 'Blue',
    specs: { engine: '3.0L Twin-Turbo I6', power: '503 hp', torque: '479 lb-ft', transmission: '8-speed M Steptronic', acceleration: '3.8s 0-60 mph', topSpeed: '180 mph', fuelType: 'Gasoline', seats: 4 },
    features: ['M Sport Seats', 'Harman Kardon Sound', 'Head-Up Display', 'Adaptive Cruise Control', 'Carbon Fiber Trim'],
    location: 'Karachi', city: 'Karachi', isNew: true, discount: 5, dealerId: '1',
  },
  {
    id: '5',
    name: 'Mercedes S-Class',
    brand: 'Mercedes',
    model: 'S-Class',
    price: 167000,
    year: 2024,
    condition: 'new',
    rating: 4.8,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800'],
    color: 'Black',
    specs: { engine: '3.0L Inline-6 Turbo', power: '429 hp', torque: '384 lb-ft', transmission: '9-speed Automatic', acceleration: '4.9s 0-60 mph', topSpeed: '155 mph', fuelType: 'Hybrid', seats: 5 },
    features: ['MBUX Interior Assist', 'Burmester 4D Sound', 'E-Active Body Control', 'Rear-Seat Entertainment'],
    location: 'Lahore', city: 'Lahore', isNew: true, dealerId: '4',
  },
  {
    id: '6',
    name: 'Hyundai Tucson 2024',
    brand: 'Hyundai',
    model: 'Tucson',
    price: 38000,
    year: 2024,
    condition: 'new',
    rating: 4.5,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800',
    images: ['https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800'],
    color: 'White',
    specs: { engine: '2.5L GDi', power: '187 hp', torque: '178 lb-ft', transmission: '8-speed Automatic', acceleration: '7.5s 0-60 mph', topSpeed: '120 mph', fuelType: 'Petrol', seats: 5 },
    features: ['SmartSense Safety', 'Panoramic Sunroof', 'Wireless Charging', 'Blind Spot Monitoring'],
    location: 'Karachi', city: 'Karachi', isNew: true,
  },
  {
    id: '7',
    name: 'Toyota Corolla 2021',
    brand: 'Toyota',
    model: 'Corolla',
    price: 19500,
    originalPrice: 26000,
    year: 2021,
    mileage: 42000,
    condition: 'used',
    rating: 4.4,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
    images: ['https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800'],
    color: 'White',
    specs: { engine: '1.8L 2ZR-FE', power: '132 hp', torque: '128 lb-ft', transmission: 'CVT', acceleration: '9.8s 0-60 mph', topSpeed: '112 mph', fuelType: 'Petrol', seats: 5 },
    features: ['Reverse Camera', 'Toyota Safety Sense', 'Bluetooth', 'Auto Climate'],
    location: 'Lahore', city: 'Lahore', sellerName: 'Ali Khan', sellerPhone: '+92-300-1234567',
  },
  {
    id: '8',
    name: 'Honda City 2020',
    brand: 'Honda',
    model: 'City',
    price: 16500,
    originalPrice: 22000,
    year: 2020,
    mileage: 65000,
    condition: 'used',
    rating: 4.2,
    reviews: 63,
    image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800',
    images: ['https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800'],
    color: 'Silver',
    specs: { engine: '1.5L i-VTEC', power: '119 hp', torque: '107 lb-ft', transmission: 'CVT', acceleration: '10.2s 0-60 mph', topSpeed: '109 mph', fuelType: 'Petrol', seats: 5 },
    features: ['Rear Camera', 'Lane Watch', 'Touchscreen', 'Keyless Entry'],
    location: 'Karachi', city: 'Karachi', sellerName: 'Ahmed Motors', sellerPhone: '+92-321-9876543',
  },
  {
    id: '9',
    name: 'Suzuki Alto 2022',
    brand: 'Suzuki',
    model: 'Alto',
    price: 8500,
    originalPrice: 10500,
    year: 2022,
    mileage: 28000,
    condition: 'used',
    rating: 4.0,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800',
    images: ['https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800'],
    color: 'Blue',
    specs: { engine: '660cc', power: '46 hp', torque: '63 lb-ft', transmission: '5-speed Manual', acceleration: '16.0s 0-60 mph', topSpeed: '95 mph', fuelType: 'Petrol', seats: 4 },
    features: ['AC', 'Power Steering', 'Front Airbags', 'USB Port'],
    location: 'Rawalpindi', city: 'Rawalpindi', sellerName: 'Babar Ali', sellerPhone: '+92-333-5556667',
  },
  {
    id: '10',
    name: 'Audi A4 2019',
    brand: 'Audi',
    model: 'A4',
    price: 35000,
    originalPrice: 48000,
    year: 2019,
    mileage: 88000,
    condition: 'used',
    rating: 4.3,
    reviews: 52,
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800',
    images: ['https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800'],
    color: 'Grey',
    specs: { engine: '2.0L TFSI', power: '187 hp', torque: '236 lb-ft', transmission: '7-speed S tronic', acceleration: '7.3s 0-60 mph', topSpeed: '150 mph', fuelType: 'Petrol', seats: 5 },
    features: ['Virtual Cockpit', 'Quattro AWD', 'Bang & Olufsen Audio', 'Panoramic Roof'],
    location: 'Islamabad', city: 'Islamabad', sellerName: 'Euro Motors', sellerPhone: '+92-311-2223334',
  },
  {
    id: '11',
    name: 'Kia Sportage 2023',
    brand: 'Kia',
    model: 'Sportage',
    price: 41000,
    year: 2023,
    condition: 'new',
    rating: 4.6,
    reviews: 278,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    images: ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'],
    color: 'Black',
    specs: { engine: '1.6L T-GDI', power: '178 hp', torque: '195 lb-ft', transmission: '7-speed DCT', acceleration: '8.5s 0-60 mph', topSpeed: '118 mph', fuelType: 'Petrol', seats: 5 },
    features: ['360 Camera', 'Kia Connect', 'Dual Panoramic', 'Smart Cruise Control'],
    location: 'Lahore', city: 'Lahore', isNew: true,
  },
  {
    id: '12',
    name: 'Honda Civic 2019',
    brand: 'Honda',
    model: 'Civic',
    price: 21000,
    originalPrice: 29000,
    year: 2019,
    mileage: 72000,
    condition: 'used',
    rating: 4.1,
    reviews: 194,
    image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800',
    images: ['https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800'],
    color: 'Red',
    specs: { engine: '1.5L VTEC Turbo', power: '174 hp', torque: '162 lb-ft', transmission: 'CVT', acceleration: '7.2s 0-60 mph', topSpeed: '134 mph', fuelType: 'Petrol', seats: 5 },
    features: ['Honda Sensing', 'Apple CarPlay', 'Lane Keep Assist', 'Sunroof'],
    location: 'Multan', city: 'Multan', sellerName: 'Star Motors', sellerPhone: '+92-300-7778889',
  },
];

export const dealers: Dealer[] = [
  {
    id: '1',
    name: 'City Motors Karachi',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/120px-Toyota_carlogo.svg.png',
    city: 'Karachi',
    address: 'Plot 15, Shahrah-e-Faisal, Karachi',
    phone: '+92-21-3456-7890',
    email: 'info@citymotors.pk',
    rating: 4.7,
    totalReviews: 234,
    totalListings: 45,
    verified: true,
    since: '2010',
    description: 'Premier Toyota & multi-brand dealership serving Karachi for over 14 years with certified pre-owned and brand new vehicles.',
    inventoryIds: ['1', '4', '7'],
  },
  {
    id: '2',
    name: 'Honda World Lahore',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/120px-Honda_Logo.svg.png',
    city: 'Lahore',
    address: 'Main Boulevard, Gulberg III, Lahore',
    phone: '+92-42-3567-8901',
    email: 'sales@hondaworld.pk',
    rating: 4.5,
    totalReviews: 189,
    totalListings: 38,
    verified: true,
    since: '2008',
    description: 'Authorized Honda dealer with the largest inventory in Punjab. New, used, and certified vehicles available.',
    inventoryIds: ['2', '8', '12'],
  },
  {
    id: '3',
    name: 'Pak Suzuki Islamabad',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/120px-Suzuki_logo_2.svg.png',
    city: 'Islamabad',
    address: 'Blue Area, Jinnah Avenue, Islamabad',
    phone: '+92-51-2678-9012',
    email: 'contact@paksuzuki.pk',
    rating: 4.3,
    totalReviews: 312,
    totalListings: 62,
    verified: true,
    since: '2005',
    description: 'Your trusted Suzuki dealership in the capital with the widest range of Suzuki vehicles and genuine spare parts.',
    inventoryIds: ['3', '9'],
  },
  {
    id: '4',
    name: 'Euro Auto Gallery',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/120px-Mercedes-Logo.svg.png',
    city: 'Karachi',
    address: 'Clifton Block 5, Karachi',
    phone: '+92-21-5789-0123',
    email: 'luxury@euroautogallery.pk',
    rating: 4.8,
    totalReviews: 97,
    totalListings: 21,
    verified: true,
    since: '2015',
    description: 'Specialists in European luxury vehicles — Mercedes-Benz, BMW, Audi. Imported directly with full warranty.',
    inventoryIds: ['4', '5', '10'],
  },
  {
    id: '5',
    name: 'Korean Motors Lahore',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Kia-logo.svg/120px-Kia-logo.svg.png',
    city: 'Lahore',
    address: 'DHA Phase 4, Commercial Area, Lahore',
    phone: '+92-42-3890-1234',
    email: 'info@koreanmotors.pk',
    rating: 4.4,
    totalReviews: 156,
    totalListings: 29,
    verified: false,
    since: '2018',
    description: 'Kia and Hyundai authorized dealer with competitive pricing and easy financing options for all models.',
    inventoryIds: ['6', '11'],
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    carId: '1',
    carName: 'Toyota Corolla 2024',
    carImage: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
    reviewerName: 'Muhammad Usman',
    reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 5,
    title: 'Best value car in Pakistan',
    body: 'Bought the Corolla 2024 last month and it has exceeded my expectations. The fuel efficiency is amazing, averaging 14km/l in city traffic. The interior feels premium and all the tech features work flawlessly. Toyota service centers are also very helpful.',
    date: 'Dec 20, 2024',
    pros: ['Excellent fuel economy', 'Smooth CVT transmission', 'Spacious interior', 'Reliable brand'],
    cons: ['No spare wheel included', 'AC could be stronger in peak summer'],
    brand: 'Toyota',
  },
  {
    id: '2',
    carId: '2',
    carName: 'Honda Civic 2024',
    carImage: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800',
    reviewerName: 'Sara Ahmed',
    reviewerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    rating: 4,
    title: 'Sporty and fun to drive',
    body: 'The Civic 2024 is a massive upgrade from the previous generation. The turbocharged engine gives great punch and the handling feels very sporty. Honda Sensing package gives real peace of mind on long motorway drives. Only wish the boot space was bigger.',
    date: 'Dec 18, 2024',
    pros: ['Powerful VTEC Turbo', 'Excellent lane assist', 'Premium audio system', 'Fun to drive'],
    cons: ['Smaller boot than competitors', 'Pricey official service'],
    brand: 'Honda',
  },
  {
    id: '3',
    carId: '4',
    carName: 'BMW M4 Competition',
    carImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    reviewerName: 'Faisal Malik',
    reviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    rating: 5,
    title: 'Track beast for the road',
    body: 'The M4 Competition is absolutely mind-blowing. 503hp of pure aggression wrapped in an elegant body. The launch control is terrifying in the best way possible. M mode transforms this car into something else entirely. Worth every rupee.',
    date: 'Dec 15, 2024',
    pros: ['Brutal performance', 'Precise steering', 'Incredible brakes', 'Amazing sound'],
    cons: ['Stiff ride in M mode', 'High fuel consumption', 'Expensive maintenance'],
    brand: 'BMW',
  },
  {
    id: '4',
    carId: '3',
    carName: 'Suzuki Swift 2024',
    carImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    reviewerName: 'Ayesha Raza',
    reviewerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    rating: 4,
    title: 'Perfect city runabout',
    body: 'The Swift is the perfect city car. It zips through traffic easily, parks effortlessly, and the fuel economy is superb. The new 2024 model has a much better interior quality than the older one. Great value for money and very easy to maintain.',
    date: 'Dec 12, 2024',
    pros: ['Nimble in city traffic', 'Affordable maintenance', 'Good fuel economy', 'Easy to park'],
    cons: ['Small cabin for tall drivers', 'Engine lacks power on highways'],
    brand: 'Suzuki',
  },
  {
    id: '5',
    carId: '5',
    carName: 'Mercedes S-Class 2024',
    carImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    reviewerName: 'Zafar Iqbal',
    reviewerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    rating: 5,
    title: 'The pinnacle of luxury',
    body: 'Nothing comes close to the S-Class for sheer luxury and technology. MBUX is light years ahead of competitors. The rear seat entertainment and massage function make long journeys feel like a spa. The hybrid system is also impressive in fuel savings.',
    date: 'Dec 8, 2024',
    pros: ['Unmatched luxury', 'Advanced MBUX system', 'Smooth hybrid drivetrain', 'Incredible comfort'],
    cons: ['Very expensive servicing', 'Not for tight parking spots'],
    brand: 'Mercedes',
  },
  {
    id: '6',
    carId: '6',
    carName: 'Hyundai Tucson 2024',
    carImage: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800',
    reviewerName: 'Nadia Hassan',
    reviewerAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100',
    rating: 4,
    title: 'Great family SUV',
    body: 'The Tucson has been a great family SUV. Spacious cabin, comfortable seats and the panoramic sunroof is a hit with the kids. SmartSense safety features are genuinely useful. The fuel economy could be better but overall a great package.',
    date: 'Dec 5, 2024',
    pros: ['Spacious cabin', 'Advanced safety features', 'Panoramic sunroof', 'Smooth ride'],
    cons: ['Average fuel economy', 'In-car tech can be laggy'],
    brand: 'Hyundai',
  },
];

export const conversations: Conversation[] = [
  { id: '1', dealerName: 'City Motors Karachi', dealerLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/60px-Toyota_carlogo.svg.png', lastMessage: 'Hello, welcome to City Motors!', time: '9:41 AM', unread: 2, isOnline: true },
  { id: '2', dealerName: 'Honda World Lahore', dealerLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/60px-Honda_Logo.svg.png', lastMessage: 'The Civic is available for test drive', time: '9:41 AM', unread: 0, isOnline: false },
  { id: '3', dealerName: 'Euro Auto Gallery', dealerLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/60px-Mercedes-Logo.svg.png', lastMessage: 'Is there anything we can do to help?', time: '9:41 AM', unread: 1, isOnline: true },
  { id: '4', dealerName: 'Pak Suzuki', dealerLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/60px-Suzuki_logo_2.svg.png', lastMessage: 'Best price guaranteed!', time: 'Yesterday', unread: 0, isOnline: false },
  { id: '5', dealerName: 'Korean Motors', dealerLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Kia-logo.svg/60px-Kia-logo.svg.png', lastMessage: 'Sportage available for pickup', time: 'Dec 20', unread: 0, isOnline: false },
];

export const transactions: Transaction[] = [
  { id: '1', title: 'Toyota Corolla 2024', amount: -28500, date: 'Dec 15, 2024', time: '10:00 AM', type: 'order', status: 'completed', image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=200' },
  { id: '2', title: 'Top Up Wallet', amount: 50000, date: 'Dec 19, 2024', time: '10:42 PM', type: 'topup', status: 'completed' },
  { id: '3', title: 'Honda Civic 2024', amount: -32000, date: 'Dec 18, 2024', time: '11:39 AM', type: 'order', status: 'completed', image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=200' },
  { id: '4', title: 'BMW M4 Competition', amount: -145000, date: 'Dec 15, 2024', time: '10:46 PM', type: 'order', status: 'completed', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200' },
  { id: '5', title: 'Top Up Wallet', amount: 180000, date: 'Dec 12, 2024', time: '09:27 AM', type: 'topup', status: 'completed' },
];

export const orders: Order[] = [
  { id: '1', carName: 'Toyota Corolla 2024', carImage: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=200', price: 28500, status: 'delivered', date: 'Dec 15, 2024', trackingId: 'TRK-001234' },
  { id: '2', carName: 'Honda Civic 2024', carImage: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=200', price: 32000, status: 'processing', date: 'Nov 28, 2024', trackingId: 'TRK-001235' },
  { id: '3', carName: 'BMW M4 Competition', carImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200', price: 145000, status: 'shipped', date: 'Nov 10, 2024', trackingId: 'TRK-001236' },
];

export const notifications = [
  { id: '1', title: 'Your offer has been accepted!', body: 'Congrats your offer on Toyota Corolla 2024 has been accepted.', time: 'Today', isRead: false, type: 'offer' },
  { id: '2', title: 'New Services Available!', body: 'New financing options available — check out 0% installments!', time: 'Yesterday', isRead: false, type: 'info' },
  { id: '3', title: 'Your offer has been rejected', body: 'Sorry, your offer has been rejected. Please check the details and try again.', time: 'Yesterday', isRead: true, type: 'offer' },
  { id: '4', title: 'Credit Card Connected!', body: 'Credit Card has been connected successfully.', time: 'Dec 22, 2024', isRead: true, type: 'payment' },
  { id: '5', title: 'Account Setup Successful', body: 'Your account has been set up successfully. Welcome to Carea!', time: 'Dec 22, 2024', isRead: true, type: 'account' },
];

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  excerpt: string;
  body: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  views: number;
}

export const blogCategories = ['All', 'Tips & Advice', 'Reviews', 'News', 'Comparison', 'Maintenance'];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Cars to Buy in 2024 on a Budget',
    category: 'Tips & Advice',
    tags: ['Budget', 'Best Deals', '2024', 'New Cars'],
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800',
    excerpt: 'Looking for a reliable car without breaking the bank? We've curated the top 10 cars you can buy in 2024 under $30,000.',
    body: 'Buying a car on a budget doesn\'t mean you have to compromise on quality or features. In 2024, there are more great options than ever before at affordable price points.\n\nThe Suzuki Swift tops our list for budget buyers. At just $14,500 for the base model, it offers excellent fuel economy, a modern interior, and reliability that Suzuki is famous for.\n\nThe Toyota Corolla comes in at a higher price point but offers exceptional long-term value. Its resale value is among the best in its class, making it a smart financial decision.\n\nThe Honda City is another strong contender, especially if you need a slightly larger sedan with a more premium feel. The i-VTEC engine is smooth and economical.\n\nFor those who prefer a crossover, the Kia Sportage offers great value with its 7-speed DCT and advanced safety features. The Hyundai Tucson is similarly well-priced for what you get.\n\nWhen shopping on a budget, always consider the total cost of ownership: insurance, fuel, and maintenance — not just the sticker price.',
    author: 'Ahsan Raza',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    date: 'Dec 20, 2024',
    readTime: '5 min read',
    views: 12400,
  },
  {
    id: '2',
    title: 'Electric vs Petrol: Which is Better for Pakistani Roads?',
    category: 'Comparison',
    tags: ['Electric', 'Petrol', 'Comparison', 'EV'],
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
    excerpt: 'As EV adoption grows globally, Pakistan faces unique infrastructure challenges. We compare electric and petrol options for local roads.',
    body: 'Electric vehicles are the future, but are they ready for Pakistan\'s roads today? This is a question many car buyers are asking as EV options become more widely available.\n\nThe case for electric: Lower running costs, smoother drive, zero tailpipe emissions, and growing charging infrastructure in major cities.\n\nThe case for petrol: Widespread fueling infrastructure, lower upfront cost, familiar maintenance ecosystem, and no range anxiety concerns.\n\nFor city driving in Karachi, Lahore, or Islamabad where charging stations are becoming available, an EV can make sense for buyers who can install home charging. The fuel savings can offset the higher purchase price within 3-4 years.\n\nFor highway driving or rural areas, petrol remains the practical choice. Until charging infrastructure expands nationwide, range anxiety is a real concern.\n\nOur verdict: For urban buyers with home charging access, an EV is worth considering. For everyone else, modern petrol hybrids offer the best of both worlds.',
    author: 'Sara Ahmed',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    date: 'Dec 18, 2024',
    readTime: '7 min read',
    views: 9800,
  },
  {
    id: '3',
    title: 'How to Inspect a Used Car Before Buying',
    category: 'Tips & Advice',
    tags: ['Used Cars', 'Inspection', 'Tips', 'Buying Guide'],
    image: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=800',
    excerpt: 'Don\'t get burned by a lemon. Our comprehensive guide covers every inspection point before you hand over your money.',
    body: 'Buying a used car is a minefield if you don\'t know what to look for. Here\'s your complete checklist.\n\n**Exterior:** Walk around the car in good daylight. Look for uneven panel gaps, paint overspray, or color mismatches — these indicate past accidents and repairs.\n\n**Underbody:** Get under the car or use a phone camera to check for rust, oil leaks, or damaged exhaust components.\n\n**Engine Bay:** Look for oil sludge, coolant leaks, cracked belts, or corroded battery terminals. A clean engine bay can also mean it was steam-cleaned to hide leaks.\n\n**Interior:** Check all electrics — windows, AC, sound system, all warning lights. Look for water stains on the carpet which indicate flooding.\n\n**Test Drive:** Drive on different road types. Listen for clunks, rattles, or grinding brakes. Test acceleration, braking, and steering.\n\n**Paperwork:** Verify the chassis number matches the documents. Check service history and ensure there are no outstanding finance payments on the car.',
    author: 'Faisal Malik',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    date: 'Dec 15, 2024',
    readTime: '8 min read',
    views: 15600,
  },
  {
    id: '4',
    title: 'BMW M4 Competition: Full Road Test Review',
    category: 'Reviews',
    tags: ['BMW', 'M4', 'Sports Car', 'Review', 'Performance'],
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    excerpt: 'We spend a week with BMW\'s flagship performance coupe. Is the 503hp M4 Competition worth the price of admission?',
    body: 'The BMW M4 Competition is not a car for the faint-hearted. With 503 horsepower from its twin-turbo inline-six, it\'s capable of speeds that will test the limits of your courage and your driving license.\n\nBut this is not just a straight-line machine. The M4\'s handling is extraordinary — balanced, predictable, and endlessly communicative. The adaptive suspension firms up perfectly in M mode without becoming punishing.\n\nInside, the M sport seats grip you firmly while still being comfortable on long drives. The curved display is BMW\'s best yet and the iDrive 8 system is finally intuitive enough to use while moving.\n\nFuel economy? Forget it. In spirited driving you\'ll see single digits. On a gentle motorway cruise, 8-10L/100km is achievable.\n\nOur verdict: At $145,000, it\'s a lot to spend on a car that isn\'t particularly practical. But as a driving machine, nothing else at this price comes close. It earns a deserved 9/10.',
    author: 'Zafar Iqbal',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    date: 'Dec 12, 2024',
    readTime: '10 min read',
    views: 8200,
  },
  {
    id: '5',
    title: 'Car Maintenance Schedule: What to Do and When',
    category: 'Maintenance',
    tags: ['Maintenance', 'Service', 'Oil Change', 'Tips'],
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
    excerpt: 'Regular maintenance is the secret to a long-lasting car. Here\'s exactly what needs to be done at each service interval.',
    body: 'Skipping car maintenance is the most expensive saving you\'ll ever make. Here\'s a simple guide to keeping your car in top shape.\n\n**Every 5,000 km:** Engine oil and filter change. This is the single most important thing you can do for your engine.\n\n**Every 10,000 km:** Air filter check, tire rotation, brake inspection, battery check.\n\n**Every 20,000 km:** Spark plugs (for petrol cars), cabin air filter, fuel filter.\n\n**Every 40,000 km:** Transmission fluid, coolant flush, timing belt inspection.\n\n**Every 60,000 km:** Full timing belt or chain service if recommended by manufacturer.\n\n**Annual:** Full brake system service, wheel alignment and balancing, AC gas check.\n\nAlways use the oil grade specified in your owner\'s manual. Using the wrong grade can cause engine wear over time.\n\nKeeping a service logbook, whether digital or physical, adds resale value and gives future buyers confidence in the car\'s history.',
    author: 'Nadia Hassan',
    authorAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100',
    date: 'Dec 8, 2024',
    readTime: '6 min read',
    views: 11300,
  },
  {
    id: '6',
    title: 'Toyota Corolla vs Honda Civic 2024: The Great Debate',
    category: 'Comparison',
    tags: ['Toyota', 'Honda', 'Corolla', 'Civic', 'Comparison'],
    image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
    excerpt: 'Two iconic nameplates, one tough decision. We put the 2024 Corolla and Civic head-to-head in the ultimate sedan showdown.',
    body: 'The Toyota Corolla and Honda Civic have been locked in battle for decades. For 2024, both have been significantly updated. Which one should you buy?\n\n**Performance:** The Civic wins with its 192hp turbocharged engine vs the Corolla\'s 169hp. For spirited driving, the Civic is more engaging.\n\n**Fuel Economy:** The Corolla edges ahead with its efficient CVT, averaging 14km/l vs the Civic\'s 12km/l in mixed driving.\n\n**Interior & Tech:** Both offer wireless CarPlay. The Civic\'s interior feels more premium with better materials. The Corolla\'s layout is more intuitive.\n\n**Safety:** Both score excellently. Toyota Safety Sense and Honda Sensing are equally comprehensive suites.\n\n**Price:** Corolla at $28,500 vs Civic at $32,000 — a significant $3,500 gap that may tip the decision for many buyers.\n\n**Reliability:** Both are excellent, but Toyota\'s service network in Pakistan is more widespread.\n\n**Verdict:** Buy the Corolla if fuel economy and total cost of ownership matter most. Buy the Civic if you want more performance and a more premium feel.',
    author: 'Muhammad Usman',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    date: 'Dec 5, 2024',
    readTime: '9 min read',
    views: 18900,
  },
];

export interface Video {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  duration: string;
  views: number;
  youtubeId: string;
  description: string;
  channel: string;
  channelAvatar: string;
  publishedAt: string;
  tags: string[];
}

export const videoCategories = ['All', 'Reviews', 'How-To', 'Comparison', 'News', 'Test Drive'];

export const videos: Video[] = [
  {
    id: '1',
    title: 'Toyota Corolla 2024 — Full In-Depth Review',
    category: 'Reviews',
    thumbnail: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
    duration: '18:42',
    views: 245000,
    youtubeId: 'dQw4w9WgXcQ',
    description: 'We take the all-new Toyota Corolla 2024 for a comprehensive review covering performance, interior, safety tech, and value for money.',
    channel: 'Carea Reviews',
    channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    publishedAt: 'Dec 20, 2024',
    tags: ['Toyota', 'Corolla', 'Sedan', 'Review'],
  },
  {
    id: '2',
    title: 'BMW M4 vs Mercedes C63 — Ultimate Drag Race',
    category: 'Comparison',
    thumbnail: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    duration: '12:05',
    views: 890000,
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Two German performance icons go head to head on the drag strip. 503hp M4 Competition vs 671hp C63 AMG — which one wins?',
    channel: 'Carea Reviews',
    channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    publishedAt: 'Dec 18, 2024',
    tags: ['BMW', 'Mercedes', 'Drag Race', 'Performance'],
  },
  {
    id: '3',
    title: 'How to Check Engine Oil — Step by Step Guide',
    category: 'How-To',
    thumbnail: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
    duration: '6:30',
    views: 120000,
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Learn how to check your engine oil level, identify if it needs changing, and what type of oil your car needs. Essential for every car owner.',
    channel: 'Carea Tips',
    channelAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    publishedAt: 'Dec 15, 2024',
    tags: ['Maintenance', 'How-To', 'Engine Oil', 'Beginner'],
  },
  {
    id: '4',
    title: 'Honda Civic 2024 Test Drive — Worth the Price?',
    category: 'Test Drive',
    thumbnail: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800',
    duration: '22:15',
    views: 312000,
    youtubeId: 'dQw4w9WgXcQ',
    description: 'We get behind the wheel of the new Honda Civic 2024 to see if its VTEC Turbo engine and premium interior justify the higher price tag.',
    channel: 'Carea Reviews',
    channelAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    publishedAt: 'Dec 12, 2024',
    tags: ['Honda', 'Civic', 'Test Drive', 'Sedan'],
  },
  {
    id: '5',
    title: 'Top 5 Electric Cars Coming to Pakistan in 2025',
    category: 'News',
    thumbnail: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
    duration: '9:48',
    views: 178000,
    youtubeId: 'dQw4w9WgXcQ',
    description: 'The EV revolution is coming to Pakistan. We look at the top 5 electric vehicles expected to launch in 2025 and what they\'ll cost.',
    channel: 'Carea News',
    channelAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100',
    publishedAt: 'Dec 10, 2024',
    tags: ['Electric', 'EV', 'News', '2025'],
  },
  {
    id: '6',
    title: 'Suzuki Swift vs Kia Picanto — Budget Car Showdown',
    category: 'Comparison',
    thumbnail: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    duration: '15:20',
    views: 95000,
    youtubeId: 'dQw4w9WgXcQ',
    description: 'Which budget city car comes out on top? We compare the Suzuki Swift and Kia Picanto on performance, comfort, features, and value.',
    channel: 'Carea Reviews',
    channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    publishedAt: 'Dec 8, 2024',
    tags: ['Suzuki', 'Kia', 'Budget', 'Comparison'],
  },
];

export const provinces = ['All', 'Punjab', 'Sindh', 'KPK', 'Balochistan', 'ICT'];
export const cities: Record<string, string[]> = {
  All: ['All Cities', 'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Multan', 'Peshawar', 'Quetta', 'Faisalabad'],
  Punjab: ['All Punjab', 'Lahore', 'Rawalpindi', 'Multan', 'Faisalabad', 'Gujranwala', 'Sialkot'],
  Sindh: ['All Sindh', 'Karachi', 'Hyderabad', 'Sukkur', 'Mirpur Khas'],
  KPK: ['All KPK', 'Peshawar', 'Abbottabad', 'Mardan', 'Swat'],
  Balochistan: ['All Balochistan', 'Quetta', 'Gwadar', 'Turbat'],
  ICT: ['Islamabad'],
};

export const nearbyLocations = [
  { id: '1', name: 'Karachi', distance: '2 km', count: 245, image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400' },
  { id: '2', name: 'Lahore', distance: '5 km', count: 312, image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400' },
  { id: '3', name: 'Islamabad', distance: '12 km', count: 178, image: 'https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?w=400' },
  { id: '4', name: 'Rawalpindi', distance: '15 km', count: 94, image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400' },
  { id: '5', name: 'Multan', distance: '25 km', count: 67, image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400' },
];
