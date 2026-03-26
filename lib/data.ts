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
