// Rich mockup database of Australian properties

export const PROPERTIES = [
    {
        id: 1,
        title: "Architectural Masterpiece with Panoramic City Views",
        price: "$2,450,000 - $2,650,000",
        numericPrice: 2500000,
        type: "buy", // buy, rent, sold
        propertyType: "House", // House, Apartment, Townhouse, Land
        address: "142 Richmond Terrace, Richmond, VIC 3121",
        suburb: "Richmond",
        postcode: "3121",
        state: "VIC",
        bedrooms: 4,
        bathrooms: 3,
        carspaces: 2,
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80"
        ],
        description: `This exceptionally built architectural residence offers the ultimate in inner-city luxury. Boasting breathtaking views of the Melbourne CBD skyline, the home features expansive light-filled living spaces, premium finishes, and a seamless flow to an outdoor entertainment terrace.

Spanning three levels with an internal lift, it offers four generous bedrooms, including a spectacular master suite with a walk-in robe and designer ensuite. The state-of-the-art kitchen features marble benchtops, high-end Miele appliances, and a butler's pantry.

Perfectly positioned just moments from Bridge Road shops, restaurants, public transport, and the MCG, this is a rare opportunity to secure one of Richmond's finest homes.`,
        features: [
            "City views",
            "Internal lift",
            "Hydronic heating",
            "Ducted air conditioning",
            "Miele kitchen appliances",
            "Double lock-up garage",
            "Polished concrete floors",
            "Wine cellar"
        ],
        agent: {
            name: "Sarah Jenkins",
            role: "Principal Director",
            phone: "0412 345 678",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
            agency: "McGrath Estate Agents",
            logo: "https://logos-world.net/wp-content/uploads/2023/02/McGrath-Logo.png" // Fallback placeholder or visual logo
        },
        inspections: [
            "Sat 18 Jul 10:00AM - 10:30AM",
            "Wed 22 Jul 5:30PM - 6:00PM"
        ],
        medianPrice: {
            suburb: "Richmond",
            type: "House",
            median: "$1,450,000",
            growth: "+4.2% YoY"
        },
        coordinates: { x: 45, y: 35 } // Map mock location
    },
    {
        id: 2,
        title: "Sleek Industrial Warehouse Conversion",
        price: "$1,850,000",
        numericPrice: 1850000,
        type: "buy",
        propertyType: "Apartment",
        address: "7/42-46 Fitzroy Street, Fitzroy, VIC 3065",
        suburb: "Fitzroy",
        postcode: "3065",
        state: "VIC",
        bedrooms: 2,
        bathrooms: 2,
        carspaces: 1,
        images: [
            "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80"
        ],
        description: `Set within the iconic former MacRobertson Chocolate Factory, this stunning warehouse conversion seamlessly blends heritage character with high-end contemporary refinement.

Featuring soaring double-height ceilings, exposed red brick walls, original timber columns, and massive steel-framed windows that bathe the open-plan interior in natural light. The spacious living and dining zone is anchored by a gourmet kitchen with stainless steel benchtops and high-performance appliances.

Located in the absolute heart of Fitzroy, you are steps away from Brunwick Street's vibrant cafes, bars, boutique shops, and city-bound trams.`,
        features: [
            "Exposed brick walls",
            "Soaring ceilings",
            "Heritage character",
            "Secure parking",
            "Hydronic heating",
            "Polished timber floors"
        ],
        agent: {
            name: "Marcus Wong",
            role: "Senior Sales Executive",
            phone: "0498 765 432",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80",
            agency: "Jellis Craig",
            logo: "https://www.jelliscraig.com.au/assets/images/logo.svg"
        },
        inspections: [
            "Sat 18 Jul 11:30AM - 12:00PM",
            "Thu 23 Jul 6:00PM - 6:30PM"
        ],
        medianPrice: {
            suburb: "Fitzroy",
            type: "Apartment",
            median: "$820,000",
            growth: "+2.8% YoY"
        },
        coordinates: { x: 55, y: 25 }
    },
    {
        id: 3,
        title: "Renovated Victorian Terrace in Tree-Lined Street",
        price: "$2,200,000",
        numericPrice: 2200000,
        type: "buy",
        propertyType: "House",
        address: "88 Crown Street, Surry Hills, NSW 2010",
        suburb: "Surry Hills",
        postcode: "2010",
        state: "NSW",
        bedrooms: 3,
        bathrooms: 2,
        carspaces: 1,
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80"
        ],
        description: `This classic Victorian terrace has been masterfully transformed into a modern sanctuary of light and style, while preserving its heritage charm. 

Boasting open-plan living and dining areas complete with marble fireplaces, high ceilings, and premium timber floors. The rear of the property opens up via bi-fold doors to a private paved courtyard garden with off-street parking.

Located in a highly sought-after, tree-lined street just steps from Bourke Street cafes, dining hotspots, light rail, and parklands.`,
        features: [
            "Victorian heritage features",
            "Marble fireplaces",
            "Rear lane access with parking",
            "Private courtyard",
            "Ducted air-conditioning",
            "Attic conversion storage"
        ],
        agent: {
            name: "Emily Croft",
            role: "Partner & Agent",
            phone: "0422 111 222",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80",
            agency: "Ray White",
            logo: "https://brandlogos.net/wp-content/uploads/2021/11/ray-white-logo.png"
        },
        inspections: [
            "Sat 18 Jul 1:00PM - 1:45PM",
            "Tue 21 Jul 12:30PM - 1:00PM"
        ],
        medianPrice: {
            suburb: "Surry Hills",
            type: "House",
            median: "$2,100,000",
            growth: "+5.1% YoY"
        },
        coordinates: { x: 30, y: 65 }
    },
    {
        id: 4,
        title: "Stunning Penthouse Apartment with River & City Skyline Views",
        price: "$1,650 per week",
        numericPrice: 1650, // represented as rent per week
        type: "rent",
        propertyType: "Apartment",
        address: "32/100 Oxlade Drive, New Farm, QLD 4005",
        suburb: "New Farm",
        postcode: "4005",
        state: "QLD",
        bedrooms: 3,
        bathrooms: 2.5,
        carspaces: 2,
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80"
        ],
        description: `Experience luxury riverfront living in this breathtaking penthouse apartment situated in the highly exclusive New Farm peninsula.

Featuring floor-to-ceiling glass walls that frame panoramic Brisbane River and CBD views, a magnificent chef's kitchen, and a large wraparound balcony perfect for entertaining. The building includes access to a private lap pool, gym, and manicured tropical gardens.

Walk along the Riverwalk directly to Sydney Street Ferry, New Farm Park, and the Howard Smith Wharves dining precinct.`,
        features: [
            "Riverfront position",
            "Wraparound balcony",
            "Private pool & gym",
            "Ducted air-conditioning",
            "Secure side-by-side double garage",
            "Video intercom access"
        ],
        agent: {
            name: "Liam O'Connor",
            role: "Property Manager",
            phone: "0488 999 000",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
            agency: "Place Estate Agents",
            logo: "https://www.placeproperty.com.au/assets/images/logo.png"
        },
        inspections: [
            "Sat 18 Jul 9:00AM - 9:20AM",
            "Wed 22 Jul 12:00PM - 12:15PM"
        ],
        medianPrice: {
            suburb: "New Farm",
            type: "Apartment",
            median: "$850,000",
            growth: "+7.4% YoY"
        },
        coordinates: { x: 75, y: 70 }
    },
    {
        id: 5,
        title: "Modern Family Home in Prestigious School Zone",
        price: "$2,950,000",
        numericPrice: 2950000,
        type: "buy",
        propertyType: "House",
        address: "15 Lansell Road, Toorak, VIC 3142",
        suburb: "Toorak",
        postcode: "3142",
        state: "VIC",
        bedrooms: 5,
        bathrooms: 4,
        carspaces: 3,
        images: [
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=1200&q=80"
        ],
        description: `Located in one of Toorak's most prestigious avenues, this magnificent contemporary residence boasts grand proportions and premium luxury over two levels.

Featuring multiple light-filled living zones, a state-of-the-art kitchen with Gaggenau appliances, a home theatre room, and a stunning landscaped backyard with a heated swimming pool. 

Positioned close to Melbourne's top schools, Toorak Village, and public transport options.`,
        features: [
            "Heated swimming pool",
            "Gaggenau appliances",
            "Home theatre room",
            "Three-car garage",
            "Landscaped garden",
            "State of the art security system"
        ],
        agent: {
            name: "Sarah Jenkins",
            role: "Principal Director",
            phone: "0412 345 678",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
            agency: "McGrath Estate Agents",
            logo: "https://logos-world.net/wp-content/uploads/2023/02/McGrath-Logo.png"
        },
        inspections: [
            "Sat 18 Jul 2:00PM - 2:30PM"
        ],
        medianPrice: {
            suburb: "Toorak",
            type: "House",
            median: "$4,800,000",
            growth: "+1.5% YoY"
        },
        coordinates: { x: 50, y: 55 }
    },
    {
        id: 6,
        title: "Boutique Art Deco Apartment near Beachfront",
        price: "$650 per week",
        numericPrice: 650,
        type: "rent",
        propertyType: "Apartment",
        address: "4/12 Glen Huntly Road, Elwood, VIC 3184",
        suburb: "Elwood",
        postcode: "3184",
        state: "VIC",
        bedrooms: 2,
        bathrooms: 1,
        carspaces: 1,
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80"
        ],
        description: `This charming Art Deco apartment captures the essence of bayside living. Positioned on the first floor in a block of only six, it offers classic period features and direct proximity to Elwood beach.

Features include leadlight windows, high ornate ceilings, polished dark timber boards, a functional gas kitchen, and a sun-soaked rear balcony.

Enjoy a short walk to Ormond Road cafes, restaurants, parks, and the beachfront.`,
        features: [
            "Ornate Art Deco details",
            "Polished floorboards",
            "Sun-filled balcony",
            "Walk to Elwood Beach",
            "Gas heating"
        ],
        agent: {
            name: "Marcus Wong",
            role: "Senior Sales Executive",
            phone: "0498 765 432",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80",
            agency: "Jellis Craig",
            logo: "https://www.jelliscraig.com.au/assets/images/logo.svg"
        },
        inspections: [
            "Sat 18 Jul 12:15PM - 12:30PM",
            "Mon 20 Jul 5:00PM - 5:15PM"
        ],
        medianPrice: {
            suburb: "Elwood",
            type: "Apartment",
            median: "$670,000",
            growth: "+3.5% YoY"
        },
        coordinates: { x: 40, y: 75 }
    },
    {
        id: 7,
        title: "Brand New Ultra-Modern Townhouse",
        price: "$1,380,000",
        numericPrice: 1380000,
        type: "sold",
        propertyType: "Townhouse",
        address: "2B Balmain Street, Richmond, VIC 3121",
        suburb: "Richmond",
        postcode: "3121",
        state: "VIC",
        bedrooms: 3,
        bathrooms: 2.5,
        carspaces: 1,
        images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
        ],
        description: `SOLD PRIOR TO AUCTION.
This newly completed, architecturally designed townhouse showcases luxury finishes and low-maintenance convenience across two stunning levels. 

Featuring floor-to-ceiling double-glazed windows, open-plan oak-floored living area, master suite with a massive walk-in-robe and fully tiled ensuite, plus a secure remote-control garage.

A stone's throw from Swan Street cafes, Richmond Station, and local parks.`,
        features: [
            "Double glazed windows",
            "French oak floorboards",
            "Stone benchtops",
            "Reverse cycle cooling",
            "Remote lock-up garage"
        ],
        agent: {
            name: "Sarah Jenkins",
            role: "Principal Director",
            phone: "0412 345 678",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
            agency: "McGrath Estate Agents",
            logo: "https://logos-world.net/wp-content/uploads/2023/02/McGrath-Logo.png"
        },
        inspections: [], // Sold property - no inspections
        medianPrice: {
            suburb: "Richmond",
            type: "Townhouse",
            median: "$1,120,000",
            growth: "+5.0% YoY"
        },
        coordinates: { x: 42, y: 38 }
    },
    {
        id: 8,
        title: "Exclusive Vacant Land Parcel with Plans Approved",
        price: "$950,000",
        numericPrice: 950000,
        type: "buy",
        propertyType: "Land",
        address: "24 Parkside Way, New Farm, QLD 4005",
        suburb: "New Farm",
        postcode: "4005",
        state: "QLD",
        bedrooms: 0,
        bathrooms: 0,
        carspaces: 0,
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
        ],
        description: `This represents a golden opportunity to secure a prime 450sqm cleared allotment in one of Brisbane's most premium suburbs. 

The site comes complete with council-approved architectural designs for a luxurious 5-bedroom, 4-bathroom luxury residence with a pool, eliminating months of planning delays.

Ideally situated in an elevated street, just minutes to local dining options, New Farm Park, and the Brisbane CBD.`,
        features: [
            "450sqm level block",
            "Council approved plans",
            "Soil tests completed",
            "Elevated position",
            "Fenced boundary"
        ],
        agent: {
            name: "Liam O'Connor",
            role: "Sales Specialist",
            phone: "0488 999 000",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
            agency: "Place Estate Agents",
            logo: "https://www.placeproperty.com.au/assets/images/logo.png"
        },
        inspections: [
            "By Appointment Only"
        ],
        medianPrice: {
            suburb: "New Farm",
            type: "Land",
            median: "$1,600,000",
            growth: "+12.1% YoY"
        },
        coordinates: { x: 70, y: 65 }
    }
];
