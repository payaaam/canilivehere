export default {
  listings: [
    {
      ID: 'listing-id-1111',
      brand: 'Timex',
      series: 'Weekender',
      modelNumber: 'TA123',
      movement: 'Automatic',
      caseSize: 50,
      caseMaterial: 'Steel',
      bandMaterial: 'Leather',
      condition: 'Like New',
      createdAt: '2016-12-26T00:04:50.204081-05:00',
      updatedAt: '2016-12-26T00:04:50.204081-05:00',
      userId: 'user-id-1111',
      status: 'active',
      price: 149
    },
    {
      id: 1,
      brand: 'Rolex',
      series: 'Submariner',
      price: 3490
    },
    {
      id: 2,
      brand: 'IWC',
      series: 'Big Pilot 7-Day',
      price: 7490
    },
    {
      id: 3,
      brand: 'Omega',
      series: 'Seamaster',
      price: 1495
    },
    {
      id: 4,
      brand: 'Audemars Piguet',
      series: 'Royal Oak',
      price: 35800
    },
    {
      id: 5,
      brand: 'Breitling',
      series: 'Chronomat',
      price: 134000
    },
    {
      id: 6,
      brand: 'Rolex',
      series: 'GMT Master',
      price: 8500
    },
    {
      id: 7,
      brand: 'Hublot',
      series: 'Classic Fusion',
      price: 1345
    }
  ],
  user: {
    email: 'payamabedi@gmail.com',
    seller: true
  },
  siteConfig: {
    watchBrands: ['Rhino', 'Rolex', 'Omega', 'Audemars Piguet', 'Breitling', 'IWC', 'Timex', 'Hublot'],
    watchModels: ['Submariner', 'Seamaster', 'Royal Oak', 'Chronomat', 'Aviator'],
    watchCondition: ['New', 'Like New', 'Ok', 'Poor'],
    watchMovements: ['Automatic', 'Quartz', 'Mechanical', 'Tuning Fork'],
    watchCaseSize: ['40mm', '45mm', '50mm', '55mm', '60mm'],
    watchCaseMaterial: ['Steel', 'Titanium', 'Gold', 'Silver'],
    watchBandMaterial: ['Leather', 'Titanium', 'Gold', 'Silver', 'Crocodile'],
    watchWaterResistance: ['500m', '1000m', '1500m', '2000m'],
    watchGender: ['Male', 'Female']
  }
}