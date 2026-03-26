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
      avatar: 'https://picsum.photos/seed/felix/100/100'
    },
    date: '24 de Out, 2024',
    readTime: '12 MIN DE LEITURA',
    image: 'https://picsum.photos/seed/dalat/1200/800',
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
      avatar: 'https://picsum.photos/seed/felix/100/100'
    },
    date: '26 de Out, 2024',
    readTime: '8 MIN DE LEITURA',
    image: 'https://picsum.photos/seed/nomad/1200/800',
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
      avatar: 'https://picsum.photos/seed/felix/100/100'
    },
    date: '28 de Out, 2024',
    readTime: '10 MIN DE LEITURA',
    image: 'https://picsum.photos/seed/amalfi/1200/800',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj4sCdyNlrwPhDGh4uQj4tWHgaqJW-y7_ly9fHUkRRqR8GgZD6-wWHZ9_3W5U38qjlPNdfLTMn64jgK-7W8-WrveVM2oM_JVjj465qGo8jKjqMPsuD_5dSNlrCMYBtu0Uj0442qkCbFEuks_z-x0QMxAygbXeTFjtCU_oYzXEgKNjZzgYRFvrzZcd83LwPe_kMqOsPJIM8mYzTOBiysdfHAZiVla1-wDa2KLKn_Imt-rbA9TiXQ75YpgCxj58sJO613JF_yJiUbc4',
    category: 'Arquitetura'
  },
  {
    id: '2',
    title: 'Florescer Primal',
    location: 'Amazonas, Brasil',
    camera: 'Leica M11',
    lens: '35mm f/1.4 Summilux',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhMFXUtWMwvLNQ40auCHE_eMoPJPU1zuLRb4rvCzIHPCqUwGR3VtCLFEdZ3KWPYp6ZlQOnaM63fKu9XBy-dFbsTw2w1aEvnkq3HVJ3HHMV1vGAU0GkL4ZY6uvUl1lprcL_A0hP1ZDBAHbiNI2tdw8mm74LU6UNmroQ10mzNd4wPMjA4N-s7nyM651Rwh5P_JtgL4RV6oJKptgkX9BmskUYZv20-GSajLaH8wzK8OMlK51qROIcCE9ZiijJAJYjz-ssGvjZ3l8wLek',
    category: 'Natureza'
  },
  {
    id: '3',
    title: 'Fogo Oceânico',
    location: 'Santorini, Grécia',
    camera: 'Leica M11',
    lens: '35mm f/1.4 Summilux',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsYbqdTbZgqElKB6cgq84XvSIJLlBkYL26KK4nALw2K0gPlOTezuB2hLdhHy2U29t4Mp1wSQa2SoEhICeO5kRGNY2uzUWvYZeK_X6o_nRjtRYn1MZTVhFGwQvl8NZLdzVsC2GXvmRVFwF7P_1eIGFDXJ2ijso4Hi-RVScMSlghfWAzcyjXOinlKyzaiXBO1R-mX-fAIjou6PFkITRa8rgt844g-y7Y-K8hTHG2XqRzoenSbfF8aRP11iiIweK3EA7cpFccnh7qcJM',
    category: 'Paisagem'
  },
  {
    id: '4',
    title: 'Olhar Elétrico',
    location: 'Tóquio, Japão',
    camera: 'Leica M11',
    lens: '35mm f/1.4 Summilux',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDE7WVpFfrEgGUjcvzP1qz_-aVonmWwoR0zCPuaBGwa19A3NEsMOkQjv39jrw9IlWEqdTVmNI4ixhHawhgdVkASF_ZK-uwBUw7ynZbr_SHK0N73PrLEs9UO1Ne-pUdn141wFrWtiBi6YC3jY10B_SVgPeMlTo4hUy95A-iwctPh8Pqv9I9oMifl1cuItakGsyyPEhxQDT3OLDJrz1Gtko1mWTVRpRohbOT2IQwihQhsWyb8KLEgxFR_gCbaCafBLioXvhzhrihjCKU',
    category: 'Retratos'
  },
  {
    id: '5',
    title: 'O Lar Solitário',
    location: 'Lapônia, Finlândia',
    camera: 'Leica M11',
    lens: '35mm f/1.4 Summilux',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI4z_347QdBz6K4J25O1ZNgUWj3EBl_H0LoZzWy_dcpzZAaboHSMqy5oNbDE4ENANPg5FxRJzfyVKmrnY33d2Roz3bPw7dYQteGN1mfjdcAhumjS8Tn-is_lf8558Ahh8xyO-ytFgiakP6NK7P1nCb_SJkwMLciuS071i8RlR--G9Dwu7hkLijAERidzzOHPe56og8ocZV991LZBTaJthjd1OPQ-IL9RQpmewxUqX_GMr3junzgvM5q5bYjEsUmdohwycMI5eSM68',
    category: 'Atmosfera'
  },
  {
    id: '6',
    title: 'Amanhecer nas Dolomitas',
    location: 'Tirol do Sul, Itália',
    camera: 'Leica M11',
    lens: '35mm f/1.4 Summilux',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3TMr4UWheovnjjiNjwjsahclI1xn3o2t_ns1Upxm90mHJfWje1VTpDWfA-VicsvX06pKDVd16huduRZiwelz3fpNE-WU36AMPjf_PRgf3dTryRoA5c-cTwqWXfXJhH9Anyo9bZEIKkToK2hsAHT9EqPOVBajDkFtMeifP_52PvrV1NnHJ1Gg-LNHlwuVKc24yFvA2BDxorX_uW_1UPKeQ09LnDRShseUxHHoBBNOERbSpojF_ptXQjTLzpPIAFbuQhn2YiqT7RFI',
    category: 'Paisagem'
  }
];
