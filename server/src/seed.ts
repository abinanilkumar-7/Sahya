import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Resource from './models/Resource';
import User from './models/User';
import bcrypt from 'bcryptjs';

dotenv.config();

const INITIAL_RESOURCES = [
  {
    name: 'City Care Multi-Specialty Hospital',
    category: 'Hospitals',
    description: '24/7 Tertiary care hospital with specialized ICU units, trauma care, and oxygen generation plant.',
    contact: {
      phone: '+91 98765 43210',
      email: 'emergency@citycare.org',
      website: 'https://citycarehospital.org',
    },
    address: {
      street: '45 Healthcare Boulevard, MG Road Area',
      city: 'Central City',
      state: 'State Central',
      pincode: '400001',
      fullAddress: '45 Healthcare Boulevard, MG Road Area, Central City - 400001',
    },
    location: {
      type: 'Point',
      coordinates: [72.8777, 19.0760],
    },
    availability: {
      beds: 42,
      icuBeds: 8,
      oxygenCylinders: 65,
      status: 'AVAILABLE',
      notes: 'Trauma ward open. Ventilators available in ICU-2.',
    },
    operatingHours: '24/7 Open',
    verified: true,
    status: 'ACTIVE',
  },
  {
    name: 'Apex LifeCare Pharmacy',
    category: 'Pharmacies',
    description: '24-hour authentic medicine dispensing center stocking essential critical care and emergency drugs.',
    contact: {
      phone: '+91 98765 12345',
      email: 'orders@apexlifecare.com',
    },
    address: {
      street: '12 Station Road, Opposite Metro Gate 3',
      city: 'Central City',
      state: 'State Central',
      pincode: '400002',
      fullAddress: '12 Station Road, Opposite Metro Gate 3, Central City - 400002',
    },
    location: {
      type: 'Point',
      coordinates: [72.8820, 19.0790],
    },
    availability: {
      status: 'AVAILABLE',
      notes: 'Full stock of antivirals and antibiotics.',
    },
    operatingHours: '24/7 Open',
    verified: true,
    status: 'ACTIVE',
  },
  {
    name: 'Metropolitan Red Cross Blood Bank',
    category: 'Blood Banks',
    description: 'State-certified blood transfusion center providing tested whole blood, PRBC, and single donor platelets.',
    contact: {
      phone: '+91 98220 99887',
      email: 'donor@redcrossblood.org',
    },
    address: {
      street: '8 Red Cross Drive, Civil Lines',
      city: 'Central City',
      state: 'State Central',
      pincode: '400005',
      fullAddress: '8 Red Cross Drive, Civil Lines, Central City - 400005',
    },
    location: {
      type: 'Point',
      coordinates: [72.8650, 19.0680],
    },
    availability: {
      bloodGroupsAvailable: ['O+', 'A+', 'B+', 'O-', 'AB+'],
      status: 'AVAILABLE',
      notes: 'O- Negative emergency units reserved.',
    },
    operatingHours: '8:00 AM - 10:00 PM (Emergency 24/7)',
    verified: true,
    status: 'ACTIVE',
  },
  {
    name: 'PureAir Emergency Medical Oxygen Hub',
    category: 'Oxygen',
    description: 'Medical oxygen refilling and cylinder home delivery center equipped with high-purity medical oxygen.',
    contact: {
      phone: '+91 98111 22334',
      email: 'help@pureairoxygen.in',
    },
    address: {
      street: 'Plot 78, Industrial Estate Phase II',
      city: 'Central City',
      state: 'State Central',
      pincode: '400015',
      fullAddress: 'Plot 78, Industrial Estate Phase II, Central City - 400015',
    },
    location: {
      type: 'Point',
      coordinates: [72.8600, 19.0920],
    },
    availability: {
      oxygenCylinders: 48,
      status: 'AVAILABLE',
      notes: 'B-type and D-type cylinders in stock.',
    },
    operatingHours: '24/7 Open',
    verified: true,
    status: 'ACTIVE',
  },
];

const seedDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/sahya';
    await mongoose.connect(connStr);
    console.log('[Seed] Connected to MongoDB');

    await Resource.deleteMany({});
    await User.deleteMany({});

    await Resource.insertMany(INITIAL_RESOURCES);
    console.log('[Seed] Inserted initial verified resources');

    const salt = await bcrypt.genSalt(10);
    const adminPass = await bcrypt.hash('admin123', salt);

    await User.create({
      name: 'Sahya Admin',
      email: 'admin@sahya.org',
      passwordHash: adminPass,
      role: 'ADMIN',
      phone: '+91 98765 00000',
      city: 'Central City',
    });
    console.log('[Seed] Admin user created: admin@sahya.org / admin123');

    console.log('[Seed] Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Failed:', error);
    process.exit(1);
  }
};

seedDB();
