import { Post, Photo } from './types';

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    slug: 'os-vales-silenciosos-de-da-lat',
    title: 'Os Vales Silenciosos de Da Lat',
    excerpt: 'Além da agitação das cidades costeiras, encontra-se um santuário nas terras altas. Passamos sete dias mapeando as plantações de café envoltas em névoa e a arquitetura colonial francesa.',
    body: `Vagar pelas terras altas é se envolver em uma negociação sensorial. O ar é espesso com o perfume de turfa úmida e urze antiga, um perfume que permanece inalterado por milênios. Ao contrário do pulso rápido das paisagens urbanas modernas, a vida aqui se move no ritmo das sombras que mudam.

Chegamos ao amanhecer, o céu uma paleta machucada de índigo e carvão. As montanhas não emergiram; elas se revelaram lentamente, perdendo camadas de neblina como um viajante cansado removendo casacos pesados. Há um tipo específico de peso no ar nestas partes — uma umidade que não sufoca, mas sim ancora você à terra.`,
    category: 'SUDESTE ASIÁTICO',
    author: {
      name: 'Félix Neto',
      role: 'Viajante & Fotógrafo',
      avatar: ''
    },
    date: '24 de Out, 2024',
    readTime: '12 MIN DE LEITURA',
    image: '/uploads/placeholder.svg',
    tags: ['VIETNÃ', 'VIAGEMDEVAGAR', 'FOTOGRAFIA']
  },
  {
    id: '2',
    slug: 'repensando-o-nomadismo-moderno',
    title: 'Repensando o Nomadismo Moderno',
    excerpt: 'A busca pela "autenticidade" está destruindo os lugares que amamos? Um ensaio sobre o desejo de viajar de forma sustentável.',
    body: 'Conteúdo completo do ensaio aqui...',
    category: 'ÚLTIMO RELATO',
    author: {
      name: 'Félix Neto',
      role: 'Viajante & Fotógrafo',
      avatar: ''
    },
    date: '26 de Out, 2024',
    readTime: '8 MIN DE LEITURA',
    image: '/uploads/placeholder.svg',
    tags: ['ENSAIO', 'SUSTENTABILIDADE']
  },
  {
    id: '3',
    slug: 'verticalidade-vibrante',
    title: 'Verticalidade Vibrante',
    excerpt: 'Navegando pelas escadarias nas encostas da Costa Amalfitana durante a baixa temporada.',
    body: 'História completa aqui...',
    category: 'EUROPA OCIDENTAL',
    author: {
      name: 'Félix Neto',
      role: 'Viajante & Fotógrafo',
      avatar: ''
    },
    date: '28 de Out, 2024',
    readTime: '10 MIN DE LEITURA',
    image: '/uploads/placeholder.svg',
    tags: ['ITÁLIA', 'COSTEIRO']
  }
];

export const MOCK_PHOTOS: Photo[] = [
  {
    id: '1',
    title: 'Quietude Geométrica',
    location: 'Berlim, Alemanha',
    camera: 'Leica M11',
    lens: '35mm f/1.4 Summilux',
    image: '/uploads/placeholder.svg',
    category: 'Arquitetura'
  },
  {
    id: '2',
    title: 'Florescer Primal',
    location: 'Amazonas, Brasil',
    camera: 'Leica M11',
    lens: '35mm f/1.4 Summilux',
    image: '/uploads/placeholder.svg',
    category: 'Natureza'
  },
  {
    id: '3',
    title: 'Fogo Oceânico',
    location: 'Santorini, Grécia',
    camera: 'Leica M11',
    lens: '35mm f/1.4 Summilux',
    image: '/uploads/placeholder.svg',
    category: 'Paisagem'
  },
  {
    id: '4',
    title: 'Olhar Elétrico',
    location: 'Tóquio, Japão',
    camera: 'Leica M11',
    lens: '35mm f/1.4 Summilux',
    image: '/uploads/placeholder.svg',
    category: 'Retratos'
  },
  {
    id: '5',
    title: 'O Lar Solitário',
    location: 'Lapônia, Finlândia',
    camera: 'Leica M11',
    lens: '35mm f/1.4 Summilux',
    image: '/uploads/placeholder.svg',
    category: 'Atmosfera'
  },
  {
    id: '6',
    title: 'Amanhecer nas Dolomitas',
    location: 'Tirol do Sul, Itália',
    camera: 'Leica M11',
    lens: '35mm f/1.4 Summilux',
    image: '/uploads/placeholder.svg',
    category: 'Paisagem'
  }
];
