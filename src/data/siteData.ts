export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  source: 'website' | 'brochure';
}

export interface TeamMember {
  id: string;
  name: string;
  nickname?: string;
  role: string;
  experienceYears: number;
  qualifications?: string;
  bio: string;
  image: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  location: string;
  client?: string;
  sector: string;
  status: 'Completed' | 'Current' | 'Upcoming Placeholder';
  value?: string;
  duration?: string;
  heroImage: string;
  galleryImages: string[];
  summary: string;
  scopeOfWorks: string[];
  uniqueFeatures?: string[];
  technicalMetrics: { label: string; value: string }[];
  isPlaceholder?: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  heroImage: string;
  galleryImages: string[];
  keyFeatures: string[];
  technicalDetails?: { title: string; content: string }[];
  relatedProjects: string[];
  isLegacyOriginal?: boolean;
  priorityOrder: number;
}

export interface JobListing {
  id: string;
  title: string;
  employmentType: string;
  salary: string;
  training: string;
  requirements: string[];
  responsibilities: string[];
  status: 'Active' | 'Under Review / Ongoing Need';
}

export const COMPANY_PROFILE = {
  name: 'ZNB Construction Ltd',
  established: 2013,
  location: 'Manchester, United Kingdom',
  coverage: 'Projects throughout the UK',
  description:
    'Established in 2013, ZNB Construction Ltd is a Manchester-based construction specialist delivering projects throughout the UK. We provide full slipform packages, reinforced concrete works, formwork, reinforcement fixing, concrete placing and finishing, and skilled site operatives.\n\nOur experienced management and site teams work closely with contractors to deliver safe, well-coordinated works, with a strong focus on quality, reliability and meeting project programmes.',
  brochureCompanyOverview:
    'Established in 2013, ZNB Construction offers the very best in concrete expertise, labor, and finishing techniques across the UK. Drawing on decades of specialist know-how and excellence in concrete services, we provide tailor-made solutions to the Construction, Manufacturing, and Infrastructure sectors.\n\nIn our early years, we successfully delivered many projects in the Manchester area and soon expanded our reach to work on projects throughout the UK. We have developed ongoing relationships with prominent construction companies such as Heyrod, Laing O’Rourke, Morrisroe, and many others.',
  brochureFamilyAndSafety:
    'We are proud to be a family-run business, with our family values at the heart of everything we do. Safety is paramount in our approach to every job, ensuring the well-being of both our operatives and clients. We prioritize working smarter, not harder, to achieve the best results. Understanding the needs of our clients is central to our operations. We recognize the importance of precision in our work, as concrete does not allow for significant adjustments post-installation.',
  brochureMission:
    "ZNB Construction's mission is to provide the highest quality concrete expertise, labor, and finishing techniques across the UK, delivering tailor-made solutions to the Construction, Manufacturing, and Infrastructure sectors. As a family-run business, we prioritize the safety of our operatives and clients, strive to work smarter, and are committed to getting it right the first time to avoid costly corrections.",
  brochureVision:
    'Our vision is to be the leading provider of concrete services in the UK, known for our reliability, precision, and quick response to emergency situations. We aim to build ongoing relationships with top construction companies by understanding their needs and consistently delivering exceptional results, thus maintaining and enhancing our strong reputation in the industry. Additionally, we are renowned for our quick response in “save a slab” emergency situations, effectively addressing imperfections and saving our clients time and money. Our reputation for reliability and first-time accuracy has allowed us to collaborate with top construction firms across the country.',
  contact: {
    office: '0161 914 6621',
    mobile: '+44 7376798089',
    legacyEmergencyMobile: '+44 7733113812',
    email: 'enquiries@znbconstruction.co.uk',
    legacyBrochureEmail: 'enquires@znbconstruction.co.uk',
    address: {
      line1: '32 Mersey Bank Avenue',
      city: 'Manchester',
      postcode: 'M21 7NN',
      country: 'United Kingdom',
    },
    website: 'https://znbconstruction.co.uk/',
    linkedin: 'https://uk.linkedin.com/company/www.znbconstruction.co.uk',
  },
  accreditations: {
    chasMembershipNo: '170693',
    chasScheme: 'SSIP Approved: Contractor [CDM]',
    chasCertPath: '/assets/Chas-certificate.pdf',
    standardGbCertPath: '/assets/Certificate_Standard_GB.pdf',
  },
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'slipform-packages',
    slug: 'slipform-packages',
    title: 'Full Slipform Packages',
    shortDescription:
      'Turnkey delivery of high-rise concrete cores and vertical slipform structures with in-house rig erection, steel fixing, concrete placement, continuous coordination, and precision dismantling.',
    fullDescription:
      'ZNB Construction Ltd provides complete, end-to-end slipform solutions for complex high-rise residential towers, commercial cores, and specialist civil infrastructure across the UK.\n\nFrom early methodology planning and continuous 24-hour cycle coordination through to turnkey rig erection, reinforcement fixing, precision concrete pouring, on-site supervision, and controlled dismantling, our experienced management and operatives deliver high-tolerance vertical structures safely, reliably, and ahead of programme.',
    iconName: 'Building2',
    heroImage: '/assets/page_1_asset_3.jpg',
    galleryImages: [
      '/assets/page_4_asset_1.jpg',
      '/assets/page_8_asset_1.jpg',
      '/assets/page_9_asset_1.jpg',
      '/assets/x1-1024x777.jpg',
    ],
    priorityOrder: 1,
    keyFeatures: [
      'Turnkey slipform rig erection and precision rig dismantling',
      'Continuous 24-hour vertical concrete coordination and pour logistics',
      'Dedicated slipform reinforcement fixing teams & embedded plates',
      'Integrated working platforms, safety enclosures & hanging stages',
      'Laser-guided plumb control, laser alignment & verticality verification',
      'Rigorous on-site engineering supervision and technical quality control',
      'Delivery of concrete cores and vertical structures ahead of programme',
    ],
    technicalDetails: [
      {
        title: 'Core Slipform Capability',
        content:
          'ZNB has delivered slipformed cores up to 50 storeys, notably at Croydon (50 and 35 floors), X1 Media City (two 27-storey slip-formed cores), St Michaels Manchester core (completed ahead of programme), Stoke on Trent (2 x cores 34 & 27 storeys), and New Bailey Manchester (1 x Slipform 14 floors). We coordinate the entire hydraulic jack climb cycle, concrete supply logistics, and high-rise safety protocols.',
      },
      {
        title: 'High-Tolerance Finish',
        content:
          'Our operatives apply continuous exposed surface finishing directly from the trailing platforms, eliminating honeycombing and guaranteeing smooth, ready-to-receive finishes in accordance with UK structural concrete specifications.',
      },
    ],
    relatedProjects: ['x1-media-city', 'croydon-london', 'st-michaels-manchester', 'stoke-on-trent', 'new-bailey'],
  },
  {
    id: 'rc-frames',
    slug: 'reinforced-concrete-frames',
    title: 'Reinforced Concrete Frames',
    shortDescription:
      'Complete structural RC frame packages covering foundations, transfer slabs, columns, shear walls, beams, and post-tensioned superstructure floors.',
    fullDescription:
      'ZNB Construction delivers complete reinforced concrete frames engineered to demanding architectural geometries and structural tolerances. We work closely with contractors to manage the full cycle of structural works — coordinating formwork systems, dense steel reinforcement cages, high-specification concrete pumping, and post-tensioning integration to maintain strict multi-storey project programmes.',
    iconName: 'Layers',
    heroImage: '/assets/page_3_asset_1.jpg',
    galleryImages: [
      '/assets/Installation-2.jpg',
      '/assets/page_5_asset_1.jpg',
      '/assets/page_6_asset_2.jpg',
      '/assets/installation-3.jpg',
    ],
    priorityOrder: 2,
    keyFeatures: [
      'Multi-storey reinforced concrete superstructure construction',
      'Structural concrete works covering slabs, walls, columns, and beams',
      'Post-tensioned (PT) suspended floor slabs & podium transfers',
      'Heavily reinforced shear walls, lift shafts & stair cores',
      'In-situ and precast column installation & composite decking',
      'Rigorous falsework and shoring design compliance (up to 46,000m² capacity)',
      'Structural coordination, quality, and delivery to agreed programmes',
    ],
    technicalDetails: [
      {
        title: 'Structural Coordination',
        content:
          'Our management oversees structural pour sequences, cold joint preparation, cube testing regimes, and strike-time validation to ensure early strength gain and seamless progression to subsequent levels.',
      },
    ],
    relatedProjects: ['x1-media-city', 'mecd-manchester', 'wirral-waters', 'island-quarter', 'pall-mall', 'st-michaels-manchester'],
  },
  {
    id: 'formwork-shuttering',
    slug: 'formwork-and-shuttering',
    title: 'Formwork and Shuttering',
    shortDescription:
      'Comprehensive formwork installation for foundations, columns, retaining walls, core walls, and slabs using modern panel and traditional timber systems.',
    fullDescription:
      'Precision formwork is the bedrock of superior concrete. ZNB delivers robust shuttering solutions covering formwork installation for foundations, walls, columns, beams, and slabs. Our experienced shuttering carpenters combine proprietary panel systems (Doka, Peri, RMD) with bespoke timber craftsmanship to achieve flawless geometric alignment, tight joints, and safe concrete pressure retention.',
    iconName: 'Grid',
    heroImage: '/assets/Installation-2.jpg',
    galleryImages: [
      '/assets/page_5_asset_1.jpg',
      '/assets/page_12_asset_3.jpg',
      '/assets/About-2.jpg',
    ],
    priorityOrder: 3,
    keyFeatures: [
      'Formwork installation for foundations, walls, columns, beams, and slabs',
      'High-performance modular wall and column panel systems',
      'Complex architectural and bespoke timber formwork carpentry',
      'Heavy-duty table forms and beam shoring assemblies',
      'Strict tolerance checks on plumb, squareness, and tie positions',
      'Engineered release agent application for immaculate strike finishes',
      'Systematic strike protocols preserving edge chamfers and structural safety',
    ],
    relatedProjects: ['mecd-manchester', 'wirral-waters', 'pall-mall'],
  },
  {
    id: 'steel-fixing',
    slug: 'steel-fixing',
    title: 'Steel Fixing',
    shortDescription:
      'Expert installation of high-yield reinforcement bar, fabricated cages, ground beams, and welded mesh to BS 8666 and project schedules.',
    fullDescription:
      'ZNB provides highly experienced steel fixers covering reinforcement bar and mesh installation for reinforced concrete structures. We maintain uncompromising adherence to structural bending schedules, cover spacer requirements, lap lengths, and tying integrity, ensuring effortless sign-off by structural clerks of works across complex civil and multi-storey builds.',
    iconName: 'Wrench',
    heroImage: '/assets/page_12_asset_3.jpg',
    galleryImages: [
      '/assets/installation-3.jpg',
      '/assets/page_5_asset_1.jpg',
      '/assets/About-1.jpg',
    ],
    priorityOrder: 4,
    keyFeatures: [
      'Reinforcement bar and mesh installation for reinforced concrete structures',
      'Bending schedule interpretation & rapid bar prefabricated assembly',
      'Heavy cage fixing for large pile caps, ground beams & transfer slabs (4,500t+ capacity)',
      'Shear link and starter bar positioning for slipform and jump-form structures',
      'Exact concrete cover maintenance with approved spacers and chairs',
      'Post-tensioning ducting and anchorage pocket coordination',
      'Comprehensive pre-pour QA checks and sign-off compliance',
    ],
    relatedProjects: ['mecd-manchester', 'x1-media-city', 'st-michaels-manchester'],
  },
  {
    id: 'concrete-placing-finishing',
    slug: 'concrete-placing-and-finishing',
    title: 'Concrete Placing and Finishing',
    shortDescription:
      'Specialist placing, compaction, power floating, easy floating, tamping, and textured brushed finishes for commercial slabs, external yards, and retail spaces. Preserving original website & brochure technical depth.',
    fullDescription:
      'At ZNB Construction LTD we offer what we consider to be the best concrete installation team there is. Our operatives have been trained to the highest standards and boast years of experience. They know that time is of the essence when handling your installation. Working efficiently and precisely is what ensures that no costly corrections are needed at a later date. We also pride ourselves on our ability to react quickly to emergency or urgent jobs.\n\nConcrete Pouring:\nZNB Construction LTD are experts in all methods of concrete pouring. We have experience working with all pump types to work quickly once wet concrete has been poured into forms, to screed and float the surface to ensure an even and level finish. Compacting the concrete requires precision to ensure the correct air void content and requisite hardened properties. Finishing the surface thereafter is also time sensitive and involves artisanal-levels of skill to achieve a perfect result. Our operatives are experts in standard and specialist concrete finishes, including troweling, power floating, brushed, stamped, mirrored or textured.',
    iconName: 'Sparkles',
    heroImage: '/assets/float-1.jpg',
    galleryImages: [
      '/assets/brush-1.jpg',
      '/assets/dry-1.jpg',
      '/assets/installation-3.jpg',
      '/assets/PHOTO-2025-08-27-11-26-19-1024x725.jpg',
    ],
    priorityOrder: 5,
    keyFeatures: [
      'High-capacity boom pump and static line pour management',
      'Precision mechanical screeding and internal poker compaction',
      'Power Floating (hand-operated and ride-on machines) for smooth commercial & warehouse floors',
      'Easy-float and hand trowelling for constrained and architectural surfaces',
      'Concrete Tamping for even distribution of aggregate and textured industrial finishes',
      'Brush Finishing with wire brush for non-slip car parks, lorry yards & water runoff',
      'Dry Concrete Finishing & Topping overlays to increase structural depth on worn slabs',
      'Curing compound application and joint cutting within critical windows',
    ],
    technicalDetails: [
      {
        title: 'Boom Pump',
        content:
          'At ZNB we favour using the boom pump for most jobs and we like to consider ourselves experts in its use. It is accurate and delivers precision pours with minimal wastage, perfect for most large scale installations. Boom pumps are also a fantastic solution for reaching areas behind or around obstacles. A boom pump would have no trouble reaching over a house or office block, for example, to deliver poured concrete were it’s needed. They are safe and quick to set up.',
      },
      {
        title: 'Static Pump',
        content:
          'Trailer mounted static pumps are compact and easy to place which, combined with their capacity for high pressure and volume, means that they can reach over vast distance, both horizontal and vertical. They offer low fuss, cost effective pumping solutions and can be placed at considerable distance from the pour site. Static Pumps are also optimal for sites that require high volume pours. We can provide operatives to install and operate static pump lines of all lengths.',
      },
      {
        title: 'Power Floating',
        content:
          'Power Floating is a great way to achieve a smooth, level finish. A hand operated or ride on float machine is used after the concrete has partially set, been levelled and tamped. This is usually when walking on the surface produces 3-4mm indentations. Too wet and the process will simply destroy the surface, too dry and the machine will not be able to effectively cut or fill. The resulting finish after power floating provides the perfect base for a commercial/retail environment or warehouse. Power Floating is something of a specialty for ZNB and the finish that we are most often requested to provide. We are experts in achieving current surface regularity requirements, as set out in our client’s specifications. We are confident in our ability to deliver the perfect surface for your needs.',
      },
      {
        title: 'Concrete Tamping',
        content:
          'Tamping not only offers an even finish to a concrete floor, it also ensures even distribution of aggregate material and thus a more dense, robust surface. Once fresh concrete has been poured, a tamper is used to lightly pat the surface up and down. There are many different types of tamping devices, from small hand-held ones to large scale industrial machines. All achieve a textured finish, most commonly used for industrial or farm yards and public walkways.',
      },
      {
        title: 'Brush Finishing',
        content:
          'Brush finishes are perfect for large areas that require a non-slip surface, such as a car park or lorry yard. Once the concrete has been properly levelled, a wire brush is drawn over the surface to create an even series of lines in the concrete. As well as providing better grip for vehicles, the brushed finish also helps to channel rain water for improved runoff.',
      },
      {
        title: 'Dry Concrete Finishing & Topping',
        content:
          'Where the surface of an existing area of concrete is worn, but the underlying base is still structurally sound: a layer of topping can be applied to increase structural depth, strengthen the base and provide a new hardwearing surface. For customers wanting to explore the option of topping, our operatives first assess the existing base concrete to make sure that, although worn, it is free of cracks and any other structural weaknesses that will cause a lack of proper adhesion and the topping layer to break down.',
      },
    ],
    relatedProjects: ['x1-media-city', 'mecd-manchester', 'island-quarter', 'wirral-waters'],
  },
  {
    id: 'groundworks-foundations',
    slug: 'groundworks-and-foundations',
    title: 'Groundworks and Foundations',
    shortDescription:
      'Substructure packages including piling mats, pile cap construction, ground beams, underground drainage solutions, underground services, and waterproofing.',
    fullDescription:
      'ZNB executes comprehensive substructure and groundworks packages to get projects out of the ground safely and swiftly. We coordinate deep excavation, temporary works, piling mat preparation, reinforcement, and structural concrete pouring for heavy raft foundations, grade-3 watertight basements, contiguous piled walls, and underground drainage networks.',
    iconName: 'HardHat',
    heroImage: '/assets/page_2_asset_1.jpg',
    galleryImages: [
      '/assets/page_6_asset_1.jpg',
      '/assets/page_7_asset_1.jpg',
      '/assets/About-2.jpg',
    ],
    priorityOrder: 6,
    keyFeatures: [
      'Supplying and installing engineered piling mats & crane platform stabilization',
      'Comprehensive groundworks, underground drainage solutions & underground services',
      'Waterproofing barriers, gas membranes & basement foundations',
      'Pile cropping, pile cap construction & ground beam networks',
      'Grade 3 waterproof basement slab and contiguous piled wall construction',
      'Capping Beam construction along contiguous piled walls',
    ],
    relatedProjects: ['wirral-waters', 'pall-mall', 'mecd-manchester', 'stoke-on-trent'],
  },
  {
    id: 'concrete-repairs-emergency',
    slug: 'concrete-repairs-and-emergency-response',
    title: 'Concrete Repairs and Making Good (Emergency Response)',
    shortDescription:
      'Emergency Corrections and Emergency Installation across the UK. Rapid response to "Save a Slab", resolve cold joints, repair honeycombing, grout runs, and surface imperfections.',
    fullDescription:
      'Emergency Corrections:\nAs with any enterprise or project, errors can be made and problems can occur when installing concrete. Misjudged mixes, honeycombing and grout runs are just some of the issues that ZNB are called out to on a routine basis. With our years of experience as both a service provider and client, we understand that time is of the essence in ensuring that faults are corrected effectively. By its very nature; concrete is a material that becomes increasingly harder to work with over a short space of time. We have the ability to respond fast and expertise and equipment to resolve the issue quickly. If you have any issues with a recent installation, please do not hesitate to contact us immediately.\n\nEmergency Installation:\nUnforeseen or overlooked needs for concrete pouring are also a regular occurrence. As well as needing to correct errors in a timely fashion, we are also used to responding to emergency wet concrete installations. Our team are always prepared and have everything in place to ensure that they can respond immediately, delivering exactly what you need with precision and efficiency.',
    iconName: 'AlertTriangle',
    heroImage: '/assets/response-1.jpg',
    galleryImages: [
      '/assets/response-3.jpg',
      '/assets/response.jpg',
      '/assets/safety.jpg',
    ],
    priorityOrder: 7,
    keyFeatures: [
      'Rapid-deployment emergency team on standby across the UK',
      'Emergency Corrections: Misjudged mixes, honeycombing, and grout runs',
      'Emergency Installation: Unforeseen or overlooked wet concrete installations',
      'Dedicated "Save a Slab" urgent pour salvage and cold-joint mitigation',
      'Surface imperfections, spalling, and impact damage repairs',
      'Diamond grinding, floor levelling, and polymer-modified mortar repairs',
      'Saving clients substantial time and money through first-time recovery',
    ],
    technicalDetails: [
      {
        title: 'Emergency Corrections Scope',
        content:
          'Misjudged mixes, honeycombing and grout runs are corrected before hardening ruins the structural or aesthetic integrity of the element. Concrete becomes increasingly unworkable over short periods; our rapid mobilisation preserves the pour.',
      },
      {
        title: 'Emergency Installation Scope',
        content:
          'Our team maintains 24/7 readiness with pumps, placing tools, and experienced finishers to step in on short notice when other suppliers default or emergency pours arise.',
      },
    ],
    relatedProjects: ['x1-media-city', 'mecd-manchester'],
  },
  {
    id: 'skilled-labour-supply',
    slug: 'skilled-labour-supply',
    title: 'Skilled Labour & Operative Supply',
    shortDescription:
      'Provision of experienced concrete finishers, steel fixers, shuttering carpenters, supervisors, pump operators, and concrete placing boom operators nationwide.',
    fullDescription:
      'Our Onsite Operatives work to precise standards in order to deliver installations as per your exact requirements. They are experts in all aspects of concrete installation, finishing and corrections. Whether pouring large volumes of wet concrete or finishing detailed architectural concrete; we want you to feel that your project is in a safe pair of hands.\n\nThe safety of your site is our top priority. All of our operatives are fully health and safety trained. They are provided with all of the safety equipment and protective clothing necessary. Responsive and are ready to travel to you at short notice: we are used to responding to ‘Save a Slab’ situations and understand that time and precision are of the essence. We are proud of our excellent track record in turning around emergency situations, with minimal disruption and cost to our customers.\n\nOur hiring practices mean that we attract the best and brightest. In our experience: working smarter, not necessarily harder is what delivers the best results in a timely manner for our clients. We insist that our team of onsite operatives are the very best in the business. For more information on our team, their various expertise and training standards; please contact ZNB today.',
    iconName: 'Users',
    heroImage: '/assets/site-operative-3.jpg',
    galleryImages: [
      '/assets/site-operative.jpg',
      '/assets/supply.jpg',
      '/assets/safety.jpg',
      '/assets/PHOTO-2025-08-27-11-26-19-1024x725.jpg',
    ],
    priorityOrder: 8,
    keyFeatures: [
      'Experienced Concrete Finishers, easy-floaters & power-float operators',
      'Skilled Steel Fixers (NVQ Level 2/3) & Shuttering Carpenters',
      'Dedicated Site Supervisors (SSSTS / SMSTS) & Banksmen',
      'Pump Operators & Concrete Placing Boom Operators',
      '100% CSCS-carded operatives equipped with full protective PPE',
      'Short notice travel & nationwide mobilisation for urgent programme recovery',
      'Working smarter, not harder philosophy delivering timely results',
    ],
    technicalDetails: [
      {
        title: 'Safe Pair of Hands',
        content:
          'All operatives are vetted, right-to-work verified, and undergo site-specific working at height and manual handling briefings prior to stepping on site.',
      },
    ],
    relatedProjects: ['x1-media-city', 'mecd-manchester', 'croydon-london', 'new-bailey'],
  },
];

export const PROJECTS_DATA: CaseStudy[] = [
  {
    id: 'x1-media-city',
    title: 'X1 MEDIA CITY, SALFORD QUAYS TOWERS 1 & 2',
    location: 'Salford Quays, Manchester',
    client: 'Vermont (Approx £100 million | 110 weeks duration)',
    sector: 'High-Rise Residential & Commercial',
    status: 'Completed',
    value: 'Approx £100 million (Website Source)',
    duration: '110 weeks',
    heroImage: '/assets/x1-1024x777.jpg',
    galleryImages: [
      '/assets/page_4_asset_1.jpg',
      '/assets/page_1_asset_2.jpg',
      '/assets/installation-3.jpg',
    ],
    summary:
      'ZNB carried out the concrete placing and finishing works for a single storey basement and two 27 storey residential towers within the heart of Media City in Salford Quays.\n\nThe identical towers comprise of 550 apartments offering panoramic views of the city. The project will also have retail space and a basement car park for 100 cars.\n\nThe two structures have a combined basement formed by contiguous piled walls, with two independent towers constructed from podium level.',
    scopeOfWorks: [
      'Capping Beam',
      'Basement foundation and slab construction',
      'RC Podium slab',
      '2nr 27 storey slip-formed cores',
      'Insitu column construction',
      'Placing and finishing 7500m3 of post tensioned concrete superstructure slabs',
    ],
    technicalMetrics: [
      { label: 'Towers', value: 'Two 27 Storey Towers' },
      { label: 'Apartments', value: '550 Apartments' },
      { label: 'PT Slabs Placed', value: '7,500 m³ (7500m3)' },
      { label: 'Slipform Cores', value: '2nr 27 Storey Cores' },
      { label: 'Basement Parking', value: '100 Cars' },
      { label: 'Client / Duration', value: 'Vermont | 110 Weeks' },
    ],
  },
  {
    id: 'mecd-manchester',
    title: 'MANCHESTER ENGINEERING CAMPUS DEVELOPMENT (MECD)',
    location: 'MECD, Booth Street, Manchester',
    client: 'Expanded (Laing O’Rourke) | £35 million concrete contract | 30 months',
    sector: 'Higher Education & Institutional Research',
    status: 'Completed',
    value: '£400+million overall University investment / £35M concrete contract',
    duration: '30 months (2014–2021 spanning 7 year development)',
    heroImage: '/assets/page_5_asset_1.jpg',
    galleryImages: [
      '/assets/mecd-300x240.jpg',
      '/assets/Installation-2.jpg',
      '/assets/page_12_asset_3.jpg',
    ],
    summary:
      'Awarded by repeat client Expanded (Laing O’Rourke), ZNB have been appointed for the concrete installation works to one of the single largest construction projects undertaken by any higher education institution in the UK.\n\nMECD is a £400+million investment by the University of Manchester with the project spanning over a 7 year period (2014-2021). When complete it will have eight floors and a floor space of over 76,000m² which is approximately 11 football pitches.\n\nThe MECD concrete structure comprises of two individual grade three basements formed by contiguous piled walls separated by an existing live culvert.\n\nThe eight storey superstructure consists of post tensioned slabs and four large cores. The south end of MECD will be constructed in structural steel, holocore planks and metal decks. In total 36,000m³ of concrete and over 4,500t of reinforcement was installed together with 46,000m² of falsework.',
    scopeOfWorks: [
      '4No Large jump form cores – exposed finish',
      '2No grade 3 basements',
      '36,000 m³ of structural concrete',
      'Floor space 76,000m² (approx 11 football pitches)',
      'Over 4,500t of reinforcement installation',
      '46,000m² of falsework together with post tensioned slabs',
    ],
    uniqueFeatures: [
      '4No Large jump form cores – exposed finish',
      '2No grade 3 basements',
      '36,000 m³ of structural concrete',
      'Floor space 76,000m²',
    ],
    technicalMetrics: [
      { label: 'Overall Investment', value: '£400+ Million' },
      { label: 'Concrete Contract', value: '£35 Million (30 Months)' },
      { label: 'Floor Space', value: '76,000 m² (11 Pitches)' },
      { label: 'Structural Concrete', value: '36,000 m³' },
      { label: 'Reinforcement Steel', value: 'Over 4,500t' },
      { label: 'Falsework System', value: '46,000 m²' },
    ],
  },
  {
    id: 'island-quarter',
    title: 'ISLAND QUARTER, NOTTINGHAM',
    location: 'Nottingham City Centre',
    sector: 'Student Accommodation Scheme',
    status: 'Completed',
    heroImage: '/assets/page_6_asset_1.jpg',
    galleryImages: ['/assets/page_6_asset_2.jpg', '/assets/About-1.jpg'],
    summary:
      'The project comprised of 3 blocks ranging from 8 to 12 floors. ZNB completed the RC Works to the latest development of a 693-bed student accommodation in the centre of Nottingham.',
    scopeOfWorks: [
      'The project comprised of 3 blocks ranging from 8 to 12 floors',
      'Completed the RC Works to 693-bed student accommodation',
      'Structural columns, core walls, and suspended concrete floors',
    ],
    technicalMetrics: [
      { label: 'Development', value: '693-Bed Accommodation' },
      { label: 'Building Blocks', value: '3 Blocks' },
      { label: 'Height Range', value: '8 to 12 Floors' },
      { label: 'Location', value: 'Nottingham Centre' },
    ],
  },
  {
    id: 'wirral-waters',
    title: 'WIRRAL WATERS, LIVERPOOL',
    location: 'Liverpool / Wirral Waterfront',
    sector: 'Waterfront Residential Development',
    status: 'Completed',
    heroImage: '/assets/page_6_asset_2.jpg',
    galleryImages: ['/assets/page_6_asset_1.jpg', '/assets/installation-3.jpg'],
    summary:
      'The project comprised of 6 Blocks containing 500 apartments. Supplied and installed piling mats, comprehensive groundworks and drainage solutions, and reinforced concrete work. Along with 2 R.C Frames – Post Tensioned Suspended Slabs and Installation of Precast Columns, stairs and shafts.',
    scopeOfWorks: [
      'Supplied and installed piling mats',
      'Comprehensive groundworks and drainage solutions',
      'Reinforced concrete work throughout',
      '2 R.C Frames – Post Tensioned Suspended Slabs',
      'Installation of Precast Columns, stairs and shafts',
      'Covering 6 Blocks containing 500 apartments',
    ],
    technicalMetrics: [
      { label: 'Apartments', value: '500 Apartments' },
      { label: 'Building Blocks', value: '6 Blocks' },
      { label: 'RC Frames', value: '2 R.C Frames' },
      { label: 'Slab Design', value: 'Post Tensioned Suspended' },
    ],
  },
  {
    id: 'pall-mall',
    title: 'PALL MALL, LIVERPOOL',
    location: 'Pall Mall, Liverpool',
    sector: 'Residential Tower Scheme',
    status: 'Completed',
    heroImage: '/assets/page_7_asset_1.jpg',
    galleryImages: ['/assets/page_7_asset_2.jpg', '/assets/About-2.jpg'],
    summary:
      'The project comprised of 22 Floor tower and 10 Floor lower block with 336 apartments. Supplied and installed piling mats, comprehensive groundworks and drainage solutions, and reinforced concrete work. Along with 2 R.C Frames – Post Tensioned Suspended Slabs and Installation of Precast Columns, stairs and shafts.',
    scopeOfWorks: [
      'Comprised of 22 Floor tower and 10 Floor lower block with 336 apartments',
      'Supplied and installed piling mats',
      'Comprehensive groundworks and drainage solutions',
      'Reinforced concrete work',
      '2 R.C Frames – Post Tensioned Suspended Slabs',
      'Installation of Precast Columns, stairs and shafts',
    ],
    technicalMetrics: [
      { label: 'Tower Height', value: '22 Floor Tower' },
      { label: 'Lower Block', value: '10 Floor Lower Block' },
      { label: 'Apartments', value: '336 Apartments' },
      { label: 'RC Frames', value: '2 R.C Frames' },
    ],
  },
  {
    id: 'croydon-london',
    title: 'CROYDON, LONDON',
    location: 'Croydon, London',
    sector: 'Build-to-Rent (BTR) Twin Skyscraper Scheme',
    status: 'Completed',
    heroImage: '/assets/page_7_asset_2.jpg',
    galleryImages: ['/assets/page_7_asset_1.jpg', '/assets/page_1_asset_3.jpg'],
    summary:
      'ZNB completed 2 x Slipform 50 and 35 floors plus installation of slabs stairs to create intermediate floors. Includes a total of 817 BTR (Build to Rent) one-bed and studio apartments.',
    scopeOfWorks: [
      '2 x Slipform 50 and 35 floors',
      'Installation of slabs and stairs to create intermediate floors',
      'Includes a total of 817 BTR (Build to Rent) one-bed and studio apartments',
    ],
    technicalMetrics: [
      { label: 'Primary Core', value: '50 Floors Slipform' },
      { label: 'Secondary Core', value: '35 Floors Slipform' },
      { label: 'BTR Units', value: '817 Apartments' },
      { label: 'Typology', value: '1-Bed & Studio BTR' },
    ],
  },
  {
    id: 'st-michaels-manchester',
    title: 'ST MICHAELS, MANCHESTER',
    location: 'Manchester City Centre',
    client: 'Tier-1 Main Contractor Partner',
    sector: 'Landmark City Centre Scheme',
    status: 'Current',
    heroImage: '/assets/page_8_asset_1.jpg',
    galleryImages: ['/assets/page_8_asset_2.jpg', '/assets/page_1_asset_2.jpg'],
    summary:
      'The core was one of the largest slipform’s completed by ZNB. Following completion of the slip ahead of programme ZNB are currently completing the 11 floor RC frame. The slabs are all a Post tensioned design.',
    scopeOfWorks: [
      'Mega slipform core completed ahead of programme',
      'Completing the 11 floor RC frame',
      'Post tensioned design slabs throughout',
    ],
    technicalMetrics: [
      { label: 'Core Slipform', value: 'Largest Completed Ahead of Programme' },
      { label: 'RC Frame', value: '11 Floor RC Frame' },
      { label: 'Slab Design', value: 'Post Tensioned Design' },
    ],
  },
  {
    id: 'stoke-on-trent',
    title: 'STOKE ON TRENT',
    location: 'Stoke on Trent, Staffordshire',
    client: 'Tide Construction',
    sector: 'High-Rise Residential RC Frame',
    status: 'Current',
    heroImage: '/assets/page_8_asset_2.jpg',
    galleryImages: ['/assets/page_8_asset_1.jpg', '/assets/About-1.jpg'],
    summary:
      'All aspects of Groundworks including underground drainage, underground services, waterproofing and foundations followed by an RC Frame which comprises of 2 x cores 34 & 27 storeys using slipform construction for our valued client Tide Construction.',
    scopeOfWorks: [
      'All aspects of Groundworks including underground drainage',
      'Underground services, waterproofing and foundations',
      'RC Frame comprising 2 x cores 34 & 27 storeys using slipform construction',
      'Delivered for client Tide Construction',
    ],
    technicalMetrics: [
      { label: 'Slipform Cores', value: '2 x Cores (34 & 27 Storeys)' },
      { label: 'Client', value: 'Tide Construction' },
      { label: 'Substructure', value: 'Groundworks, Drainage & Waterproofing' },
    ],
  },
  {
    id: 'new-bailey',
    title: 'NEW BAILEY, MANCHESTER',
    location: 'New Bailey, Manchester',
    sector: 'Commercial & Urban Regeneration',
    status: 'Completed',
    heroImage: '/assets/page_9_asset_1.jpg',
    galleryImages: ['/assets/page_9_asset_2.jpg', '/assets/Installation-2.jpg'],
    summary:
      'ZNB completed 1 x Slipform 14 floors plus install of Precast stairs for New Bailey in Manchester.',
    scopeOfWorks: [
      '1 x Slipform 14 floors',
      'Install of Precast stairs for New Bailey in Manchester',
    ],
    technicalMetrics: [
      { label: 'Slipform Height', value: '1 x Slipform 14 Floors' },
      { label: 'Precast Scope', value: 'Install of Precast Stairs' },
      { label: 'Location', value: 'New Bailey, Manchester' },
    ],
  },
  {
    id: 'light-body-street',
    title: 'LIGHT BODY STREET',
    location: 'Lightbody Street, Liverpool',
    sector: 'Residential & Commercial Regeneration',
    status: 'Current',
    heroImage: '/assets/page_9_asset_3.jpg',
    galleryImages: ['/assets/page_9_asset_1.jpg', '/assets/About-2.jpg'],
    summary:
      '167 one, two and three-bedroom apartments alongside 11 three-bedroom townhouses for sale, with eight ground floor commercial units and extensive public realm improvements.',
    scopeOfWorks: [
      '167 one, two and three-bedroom apartments',
      '11 three-bedroom townhouses for sale',
      'Eight ground floor commercial units',
      'Extensive public realm improvements & substructure RC works',
    ],
    technicalMetrics: [
      { label: 'Apartments', value: '167 (1, 2 & 3 Bedroom)' },
      { label: 'Townhouses', value: '11 Three-Bedroom' },
      { label: 'Commercial Units', value: '8 Ground Floor Units' },
      { label: 'Public Realm', value: 'Extensive Improvements' },
    ],
  },
  {
    id: 'wembley',
    title: 'WEMBLEY, LONDON',
    location: 'Wembley, London',
    sector: 'High-Rise Scheme (Client Placeholder)',
    status: 'Upcoming Placeholder',
    heroImage: '/assets/page_10_asset_1.jpg',
    galleryImages: ['/assets/page_1_asset_3.jpg', '/assets/float-1.jpg'],
    summary:
      'Client-requested case study placeholder. Photographs, confirmed scope of works, and verified contract details will be supplied by the client.',
    scopeOfWorks: [
      'Case study placeholder awaiting client scope verification',
      'Slipform and RC works details to be provided',
    ],
    technicalMetrics: [
      { label: 'Status', value: 'Awaiting Client Data' },
      { label: 'Location', value: 'Wembley, London' },
      { label: 'Scope', value: 'To Be Confirmed by Client' },
    ],
    isPlaceholder: true,
  },
  {
    id: 'rockingham-street',
    title: 'ROCKINGHAM STREET, SHEFFIELD',
    location: 'Sheffield, South Yorkshire',
    sector: 'Residential Scheme (Client Placeholder)',
    status: 'Upcoming Placeholder',
    heroImage: '/assets/page_2_asset_1.jpg',
    galleryImages: ['/assets/page_3_asset_1.jpg', '/assets/brush-1.jpg'],
    summary:
      'Client-requested case study placeholder. Photographs, confirmed scope of works, and verified contract details will be supplied by the client.',
    scopeOfWorks: [
      'Case study placeholder awaiting client scope verification',
      'Structural frame and core details to be provided',
    ],
    technicalMetrics: [
      { label: 'Status', value: 'Awaiting Client Data' },
      { label: 'Location', value: 'Sheffield' },
      { label: 'Scope', value: 'To Be Confirmed by Client' },
    ],
    isPlaceholder: true,
  },
  {
    id: 'india-street',
    title: 'INDIA STREET, GLASGOW',
    location: 'Glasgow, Scotland',
    sector: 'RC Superstructure (Client Placeholder)',
    status: 'Upcoming Placeholder',
    heroImage: '/assets/page_12_asset_3.jpg',
    galleryImages: ['/assets/page_7_asset_2.jpg', '/assets/site-operative.jpg'],
    summary:
      'Client-requested case study placeholder. Photographs, confirmed scope of works, and verified contract details will be supplied by the client.',
    scopeOfWorks: [
      'Case study placeholder awaiting client scope verification',
      'Superstructure concrete details to be provided',
    ],
    technicalMetrics: [
      { label: 'Status', value: 'Awaiting Client Data' },
      { label: 'Location', value: 'Glasgow, Scotland' },
      { label: 'Scope', value: 'To Be Confirmed by Client' },
    ],
    isPlaceholder: true,
  },
];

export const TEAM_DATA: TeamMember[] = [
  {
    id: 'lucky-singh',
    name: 'Surinder Pal Singh',
    nickname: 'Lucky',
    role: 'Project Manager of ZNB Construction Ltd',
    experienceYears: 15,
    image: '/assets/Lucky-1.jpg',
    bio:
      'Surinder Pal Singh, AKA “Lucky” is the Project Manager of ZNB Construction Ltd. He has been working in the construction Industry for the past 15 years. Starting out as a basic concrete labourer, he quickly became a site supervisor. Owing to all his experience and hard work, he was given an opportunity to handle a major project in Manchester. While doing so he came up with the idea of opening his own company. Surinder and his wife set up ZNB Construction Ltd in 2013 and have been managing it ever since. Today they successfully handle many projects nationwide.',
  },
  {
    id: 'zobe-naheed',
    name: 'Zobe Naheed',
    nickname: undefined,
    role: 'Director of ZNB Construction Ltd',
    experienceYears: 6,
    qualifications: 'BSc Honours Degree in Computing',
    image: '/assets/Zobe-1.jpg',
    bio:
      'Zobe Naheed is the Director of ZNB Construction Ltd and has been working in the construction industry for the past 6 years. She holds a BSc Honours Degree in the computing field and using her qualifications has set up her own company in the construction industry along with her Husband Surinder Pal Singh. They now successfully undertake many projects for major well-known companies around the UK.',
  },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  // Website testimonials
  {
    id: 'kevin-sweeney',
    quote:
      'I have worked with ZNB on multiple projects and found that their professional and proactive approach throughout has contributed significantly to the success of each project. Their ability to send skilled operatives on short notice is second to none. I consider ZNB a valued and trusted member of the project team.',
    author: 'Kevin Sweeney',
    title: 'Managing Director',
    company: 'KSC Ltd',
    source: 'website',
  },
  {
    id: 'eddi-g',
    quote:
      'ZNB carried out numerous contracts and supply of operatives on a variety of building and civil engineering schemes. They provide an excellent service and quality finish and always meet our programme requirements. We have no hesitation in recommending their company for supplying labour, finishing or installation concrete.',
    author: 'Eddi G',
    title: 'Contracts Manager',
    company: 'MNE Ltd',
    source: 'website',
  },
  {
    id: 'andrew-robertson',
    quote:
      'I can confidently recommend ZNB for reliable concrete installation and finish and experts in their field. Their work has been a one of the major factor for a successful complete of the project.',
    author: 'Andrew Robertson',
    title: 'Contracts Manager',
    company: 'Pacific Construction Ltd',
    source: 'website',
  },
  {
    id: 'chibueze-ezetendu',
    quote:
      'We are a frequent user of ZNB due to the high quality service which is always received. We find the quality of service from obtaining prices at tender stage through to the installation of concrete highly professional, efficient and cost effective. They can always be relied upon.',
    author: 'Chibueze Ezetendu',
    title: 'Commercial Support',
    company: 'Horgan Consulting ltd',
    source: 'website',
  },
  // Brochure testimonials (Page 10)
  {
    id: 'dennis-cagney',
    quote:
      'We are a frequent user of ZNB due to the high quality service which is always received. We find the quality of service from obtaining prices at tender stage through to the installation of concrete highly professional, efficient and cost effective. They can always be relied upon.',
    author: 'Dennis Cagney',
    title: 'Contracts Manager',
    company: 'Heyrod',
    source: 'brochure',
  },
  {
    id: 'shane-corcoran',
    quote:
      'I can confidently recommend ZNB for reliable concrete installation and finish and experts in their field. Their work has been a one of the major factor for a successful complete of the project.',
    author: 'Shane Corcoran',
    title: 'Director',
    company: 'Midwest',
    source: 'brochure',
  },
  {
    id: 'philip-muff',
    quote:
      'I have worked with ZNB on multiple projects and found that their professional and proactive approach throughout has contributed significantly to the success of each project. Their ability to send skilled operatives on short notice is second to none. I consider ZNB a valued and trusted member of the project team.',
    author: 'Philip Muff',
    title: 'Contracts Manager',
    company: 'Main Contractor Partner',
    source: 'brochure',
  },
];

export const CLIENT_LOGOS = [
  { name: 'Heyrod', image: '/assets/Layer-1-dark.png' },
  { name: 'Graham', image: '/assets/Layer-2-dark.png' },
  { name: 'Jennings', image: '/assets/Layer-3-dark.png' },
  { name: 'J. Reddington', image: '/assets/Layer-4-dark.png' },
  { name: 'Morrisroe', image: '/assets/Layer-5-dark.png' },
  { name: 'Thames Formwork', image: '/assets/Layer-6-dark.png' },
  { name: 'MPB', image: '/assets/Layer-7-dark.png' },
  { name: 'Laing O’Rourke', image: '/assets/Layer-8-dark.png' },
  { name: 'Wills Bros', image: '/assets/logo-wills-bros.png' },
  { name: 'Midwest', image: '/assets/logo-midwest.png' },
  { name: 'Tide Construction', image: '/assets/logo-tide.png' },
];

export const JOB_LISTINGS: JobListing[] = [
  {
    id: 'brick-layers-masons',
    title: 'Brick Layers and Masons',
    employmentType: 'Full-Time',
    salary: '£31,000 per annum',
    training: 'Training provided',
    status: 'Under Review / Ongoing Need',
    requirements: [
      'Must have a minimum of 1 year experience in the construction industry',
      'Ability to work with manual or power tools and operate motorised vehicles',
      'English language must be spoken',
    ],
    responsibilities: [
      'Laying bricks and concrete',
      'Sealing any required foundations',
      'Using spirit levels and plumb lines to check building alignment',
      'Using hand and power tools',
      'Repairing and maintaining any required building blocks',
      'Working outdoors on construction sites in all weathers and height',
    ],
  },
  {
    id: 'ac-fitter',
    title: 'Air Conditioning (AC) Fitter',
    employmentType: 'Full-Time',
    salary: '£35K-42K per annum',
    training: 'Training Provided',
    status: 'Under Review / Ongoing Need',
    requirements: [
      'Must have a minimum of 2 year experience in ac fitting',
      'Must hold a diploma in ac fitting',
      'Ability to work with manual or power tools',
      'Ability to bend, stoop, kneel or stand for long stretches of time',
      'English language must be spoken',
    ],
    responsibilities: [
      'Installing domestic and commercial air conditioning',
      'Carry out maintenance checks',
      'Repairing air conditioning systems',
      'Working in all weather conditions and height',
      'Lifting heavy tools and objects',
    ],
  },
  {
    id: 'sales-administrator',
    title: 'Sales Administrator',
    employmentType: 'Full-Time',
    salary: '£31,000 per annum',
    training: 'Training provided',
    status: 'Under Review / Ongoing Need',
    requirements: [
      'Minimum 1 year experience as Sales Administrator',
      'Degree Level qualification',
      'Must be fluent in English language',
    ],
    responsibilities: [
      'Receiving and processing purchase orders',
      'Issuing sales transaction invoices',
      'Dealing customer queries via phone/email and obtain any missing information',
      'Maintaining and updating records',
      'Compiling monthly sales reports',
      'Expediting orders through internal liaison',
      'Directing feedback from customers to relevant departments',
      'Supporting the sales department with other administrative tasks',
    ],
  },
];
