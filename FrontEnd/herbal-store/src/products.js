const products = [
  {
    _id: '1',
    name: 'Organic Lavender Essential Oil',
    vendor: 'US Organic',
    vendorImage:
      'https://t4.ftcdn.net/jpg/01/23/86/17/360_F_123861777_MR4SNZNmI0tfMMeWppNvqCIAWVAAmzXz.jpg',
    images: [
      {
        _id: 1,
        url: 'https://images.unsplash.com/photo-1512867957657-38dbae50a35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
      },
      {
        _id: 2,
        url: 'https://images.unsplash.com/photo-1615484477112-677decb29c57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      },
      {
        _id: 3,
        url: 'https://images.unsplash.com/photo-1671492241057-e0ad01ceb1c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
    ],
    price: 15.99,
    detail:
      "Lavender is one of the most popular essential oils. It's known for its calming and relaxing properties. It's also known for its ability to help with sleep, anxiety, and depression. Lavender is also known for its ability to help with sleep, anxiety, and depression.",
    countInStock: 10,
    rating: 4.5,
    numReviews: 15,
    description:
      "Lavender essential oil is one of the most complex naturally-occurring plant oils, rich in linalool, linalyl acetate, terpenes and other organic molecules. Besides its wonderful fragrance, centuries of documented experience along with modern science have established the oil's many naturally-occurring properties.",
    uses: [
      'Apply a few drops as a topical anesthetic & antiseptic to treat cuts, burns, abrasions, insect bites & stings (Lavender essential oil is one of the few essential oils that can be safely applied directly to the skin)',
      'Continue to apply to skin during the healing process as an anti-scarring agent',
      'Dab a drop or two on the upper lip at bedtime as a soothing, calming sleep inducer',
      'Rub a few drops into the temples as a headache & stress reducer',
      'Wear as a perfume with the added benefit of an insect repellant',
      'Use to remove difficult adhesives, oils & paint as a natural solvent instead of resorting to chemical treatments',
      'Regularly apply Organic Lavender Essential Oil between your dog’s shoulder blades to keep fleas and tics at bay',
    ],
    ingredients:
      "Contains only 100% certified organic lavender essential oil from the variety Lavandula x intermedia 'Grosso.'",
    reviews: [
      {
        _id: 1,
        name: 'John Doe',
        userImage: 'https://i.pravatar.cc/500?img=12',
        rating: 4,
        comment:
          'I know essential oils seem expensive. However, a little of this lavendar goes a long way. Well worth the money spent, and be careful not to use too much. I add this to my unscented lotion and also as a room freshner mixed with water in a spray bottle.',
        createdAt: '2023-04-01T12:00:00.000Z',
        updatedAt: '2023-04-01T12:00:00.000Z',
      },
      {
        _id: 2,
        name: 'Kevin Smith',
        userImage: 'https://i.pravatar.cc/500?img=14',
        rating: 5,
        comment:
          'I love this oil. I use it in my diffuser and it smells amazing. I also use it in my homemade lotion and it makes it smell so good. I will definitely be buying more of this oil.',
        createdAt: '2023-04-05T12:00:00.000Z',
        updatedAt: '2023-04-05T12:00:00.000Z',
      },
      {
        _id: 3,
        name: 'Sarah Williams',
        userImage: 'https://i.pravatar.cc/500?img=32',
        rating: 4.1,
        comment:
          'I have used YL for 20 yrs. and for the price and quality this is just as good!! I will be buying from US Organic from now on!',
        createdAt: '2023-04-05T12:10:00.000Z',
        updatedAt: '2023-04-05T12:10:00.000Z',
      },
    ],
  },

  {
    _id: '2',
    name: 'Organic Chamomile Tea',
    vendor: 'EU Organic',
    price: 9.99,
    images: [
      {
        _id: 1,
        url: 'https://images.unsplash.com/photo-1615484477112-677decb29c57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      },
      {
        _id: 2,
        url: 'https://images.unsplash.com/photo-1512867957657-38dbae50a35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
      },
      {
        _id: 3,
        url: 'https://images.unsplash.com/photo-1671492241057-e0ad01ceb1c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
    ],
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    _id: '3',
    name: 'Organic Peppermint Essential Oil',
    price: 12.99,
    images: [
      {
        _id: 1,
        url: 'https://images.unsplash.com/photo-1671492241057-e0ad01ceb1c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
      {
        _id: 2,
        url: 'https://images.unsplash.com/photo-1615484477112-677decb29c57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      },
      {
        _id: 3,
        url: 'https://images.unsplash.com/photo-1615484477112-677decb29c57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      },
    ],
    countInStock: 17,
    rating: 1.5,
    numReviews: 12,
  },
  {
    _id: '4',
    name: 'Organic Essential Oil',
    price: 12.99,
    images: [
      {
        _id: 1,
        url: 'https://images.unsplash.com/photo-1512867957657-38dbae50a35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
      },
      {
        _id: 2,
        url: 'https://images.unsplash.com/photo-1615484477112-677decb29c57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      },
      {
        _id: 3,
        url: 'https://images.unsplash.com/photo-1671492241057-e0ad01ceb1c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
    ],
    countInStock: 7,
    rating: 2.5,
    numReviews: 10,
  },
  {
    _id: '5',
    name: 'Organic Peppermint Essential Oil',
    price: 12.99,
    images: [
      {
        _id: 1,
        url: 'https://images.unsplash.com/photo-1512867957657-38dbae50a35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
      },
      {
        _id: 2,
        url: 'https://images.unsplash.com/photo-1615484477112-677decb29c57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      },
      {
        _id: 3,
        url: 'https://images.unsplash.com/photo-1671492241057-e0ad01ceb1c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
    ],
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    _id: '6',
    name: 'Organic Peppermint Essential Oil',
    price: 12.99,
    images: [
      {
        _id: 1,
        url: 'https://images.unsplash.com/photo-1512867957657-38dbae50a35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
      },
      {
        _id: 2,
        url: 'https://images.unsplash.com/photo-1615484477112-677decb29c57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      },
      {
        _id: 3,
        url: 'https://images.unsplash.com/photo-1671492241057-e0ad01ceb1c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
    ],
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    _id: '7',
    name: 'Organic Peppermint Essential Oil',
    price: 12.99,
    images: [
      {
        _id: 1,
        url: 'https://images.unsplash.com/photo-1512867957657-38dbae50a35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
      },
      {
        _id: 2,
        url: 'https://images.unsplash.com/photo-1615484477112-677decb29c57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      },
      {
        _id: 3,
        url: 'https://images.unsplash.com/photo-1671492241057-e0ad01ceb1c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      },
    ],
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
];

export default products;
