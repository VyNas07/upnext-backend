import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(' Iniciando seed do banco de dados...');

  // Limpar dados existentes
  await prisma.favorite.deleteMany();
  await prisma.program.deleteMany();
  await prisma.institution.deleteMany();
  await prisma.user.deleteMany();

  // Criar institui??es
  const institutions = await Promise.all([
    prisma.institution.create({
      data: {
        id: '1',
        name: 'Digital Innovation One',
        description: 'Maior plataforma brasileira de educa??o em tecnologia, com foco em forma??o pr?tica e inser??o no mercado.',
        website: 'https://dio.me',
        logoUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100',
      },
    }),
    prisma.institution.create({
      data: {
        id: '2',
        name: 'Universidade Federal do Rio de Janeiro',
        description: 'Institui??o p?blica de ensino superior com tradi??o em pesquisa e inova??o tecnol?gica.',
        website: 'https://ufrj.br',
        logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100',
      },
    }),
    prisma.institution.create({
      data: {
        id: '3',
        name: 'Instituto de Tecnologia',
        description: 'Centro de excel?ncia em tecnologia e inova??o, oferecendo cursos especializados e certifica??es.',
        website: 'https://institutotech.edu.br',
        logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100',
      },
    }),
    prisma.institution.create({
      data: {
        id: '4',
        name: 'Design Academy',
        description: 'Escola especializada em design digital, UX/UI e inova??o em produtos digitais.',
        website: 'https://designacademy.com.br',
        logoUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100',
      },
    }),
    prisma.institution.create({
      data: {
        id: '5',
        name: 'Tech Institute',
        description: 'Instituto de tecnologia focado em desenvolvimento de software e inova??o digital.',
        website: 'https://techinstitute.edu.br',
        logoUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100',
      },
    }),
    prisma.institution.create({
      data: {
        id: '6',
        name: 'Cloud Academy',
        description: 'Academia especializada em tecnologias cloud, DevOps e arquitetura de sistemas distribu?dos.',
        website: 'https://cloudacademy.edu.br',
        logoUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100',
      },
    }),
  ]);

  console.log(` ${institutions.length} institui??es criadas`);

  // Criar programas
  const programs = await Promise.all([
    prisma.program.create({
      data: {
        id: '1',
        title: 'Bootcamp Full Stack JavaScript',
        description: 'Programa intensivo de 6 meses para forma??o de desenvolvedores full stack com foco em JavaScript, React, Node.js e banco de dados.',
        institutionId: '1',
        category: 'Desenvolvimento Web',
        level: 'iniciante',
        duration: '6 meses',
        format: 'online',
        startDate: '2024-03-01',
        endDate: '2024-08-31',
        requirements: JSON.stringify([
          'Conhecimento b?sico de l?gica de programa??o',
          'Ensino m?dio completo',
          'Disponibilidade de 8h/dia',
          'Computador com internet est?vel'
        ]),
        benefits: JSON.stringify([
          'Certificado reconhecido pelo mercado',
          'Mentoria individual',
          'Projetos pr?ticos',
          'Aux?lio para coloca??o no mercado'
        ]),
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
        isActive: true,
      },
    }),
    prisma.program.create({
      data: {
        id: '2',
        title: 'Especializa??o em Data Science',
        description: 'Curso avan?ado em ci?ncia de dados com Python, machine learning e an?lise de big data.',
        institutionId: '2',
        category: 'Data Science',
        level: 'intermediario',
        duration: '12 meses',
        format: 'hibrido',
        startDate: '2024-04-01',
        endDate: '2025-03-31',
        requirements: JSON.stringify([
          'Gradua??o em ?reas relacionadas',
          'Conhecimento em Python',
          'Conhecimento em estat?stica',
          'Experi?ncia com an?lise de dados'
        ]),
        benefits: JSON.stringify([
          'Certificado de especializa??o',
          'Acesso a laborat?rios',
          'Projetos com empresas parceiras',
          'Rede de networking'
        ]),
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
        isActive: true,
      },
    }),
    prisma.program.create({
      data: {
        id: '3',
        title: 'Forma??o em Seguran?a da Informa??o',
        description: 'Programa completo para forma??o de profissionais em cybersecurity e seguran?a da informa??o.',
        institutionId: '3',
        category: 'Seguran?a',
        level: 'avancado',
        duration: '8 meses',
        format: 'presencial',
        startDate: '2024-05-01',
        endDate: '2024-12-31',
        requirements: JSON.stringify([
          'Experi?ncia em TI',
          'Conhecimento em redes',
          'Conhecimento em sistemas operacionais',
          'Ingl?s intermedi?rio'
        ]),
        benefits: JSON.stringify([
          'Certifica??o internacional',
          'Laborat?rio de seguran?a',
          'Simula??es de ataques',
          'Coloca??o em empresas parceiras'
        ]),
        imageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400',
        isActive: true,
      },
    }),
    prisma.program.create({
      data: {
        id: '4',
        title: 'Curso de UX/UI Design',
        description: 'Forma??o completa em design de experi?ncia do usu?rio e interface, com foco em metodologias ?geis.',
        institutionId: '4',
        category: 'Design',
        level: 'iniciante',
        duration: '4 meses',
        format: 'online',
        startDate: '2024-06-01',
        endDate: '2024-09-30',
        requirements: JSON.stringify([
          'Ensino m?dio completo',
          'Conhecimento b?sico de design',
          'Ferramentas de design (Figma, Adobe)',
          'Portfolio b?sico'
        ]),
        benefits: JSON.stringify([
          'Certificado profissional',
          'Mentoria com designers s?nior',
          'Projetos reais',
          'Acesso a comunidade exclusiva'
        ]),
        imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
        isActive: true,
      },
    }),
    prisma.program.create({
      data: {
        id: '5',
        title: 'Programa de Desenvolvimento Mobile',
        description: 'Especializa??o em desenvolvimento de aplicativos m?veis para iOS e Android usando tecnologias modernas.',
        institutionId: '5',
        category: 'Desenvolvimento Mobile',
        level: 'intermediario',
        duration: '10 meses',
        format: 'hibrido',
        startDate: '2024-07-01',
        endDate: '2025-04-30',
        requirements: JSON.stringify([
          'Conhecimento em programa??o',
          'Experi?ncia com desenvolvimento',
          'Conhecimento em APIs',
          'Dispositivos m?veis para teste'
        ]),
        benefits: JSON.stringify([
          'Certifica??o t?cnica',
          'Acesso a dispositivos de teste',
          'Publica??o na App Store',
          'Suporte para freelancing'
        ]),
        imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
        isActive: true,
      },
    }),
    prisma.program.create({
      data: {
        id: '6',
        title: 'Forma??o em DevOps',
        description: 'Curso completo em DevOps, CI/CD, containers e automa??o de infraestrutura.',
        institutionId: '6',
        category: 'DevOps',
        level: 'avancado',
        duration: '6 meses',
        format: 'online',
        startDate: '2024-08-01',
        endDate: '2025-01-31',
        requirements: JSON.stringify([
          'Experi?ncia em desenvolvimento',
          'Conhecimento em Linux',
          'Conhecimento em redes',
          'Experi?ncia com cloud'
        ]),
        benefits: JSON.stringify([
          'Certifica??es AWS/Azure',
          'Laborat?rio cloud',
          'Projetos pr?ticos',
          'Mentoria t?cnica'
        ]),
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
        isActive: true,
      },
    }),
  ]);

  console.log(` ${programs.length} programas criados`);

  // Criar usu?rio de teste
  const user = await prisma.user.create({
    data: {
      id: '1',
      name: 'Jo?o Silva',
      email: 'joao@email.com',
      interests: JSON.stringify(['Desenvolvimento Web', 'Data Science', 'UX/UI Design']),
      level: 'iniciante',
    },
  });

  console.log(` Usu?rio de teste criado: ${user.name}`);

  console.log(' Seed conclu?do com sucesso!');
}

main()
  .catch((e) => {
    console.error(' Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
