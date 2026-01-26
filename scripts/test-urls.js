const testUrls = [
  '/',
  '/blog/argentina',
  '/blog/post/guia-viaje-paris-2026',
  '/blog/post/mejores-destinos-europa-presupuesto',
  '/blog/post/visado-schengen',
  '/destinos/paris',
  '/destinos/barcelona',
  '/destinos/francia',
  '/condiciones-venta',
  '/cookies',
  '/experiencias/navidad-europa',
  '/experiencias/arte-cultura',
  '/paquetes/europa-15-dias',
  '/paquetes/capitales-europeas',
  '/ofertas/black-friday',
  '/es-ar',
  '/es-ar/destinos/francia',
  '/es-ar/paquetes/europa-15-dias',
  '/es-ar/experiencias/navidad-europa',
  '/es-ar/blog',
  '/es-ar/blog/colombia',
  '/es-co/destinos/belgica',
  '/es-co/paquetes/luna-de-miel',
  '/es-co/blog',
  '/es-co/blog/peru',
  '/es-mx/ofertas/black-friday',
  '/es-mx/blog',
  '/es-pa',
  '/es-pa/paquetes/norte-europa',
  '/es-pa/blog',
  '/es-pa/blog/mexico',
  '/es-pe/destinos/francia',
  '/es-pe/blog',
  '/es-pe/blog/argentina',
  '/es-cr/blog',
  '/es-cr/blog/colombia',
  '/es-do',
  '/es-do/experiencias/navidad-europa',
  '/es-do/blog',
  '/es-do/blog/brasil',
  '/pt-br/ofertas/ofertas-verano',
  '/pt-br/blog',
  '/pt-br/blog/colombia',
  '/en-ar',
  '/en-ar/destinations/france',
  '/en-ar/packages/europa-10-dias',
  '/en-co',
  '/en-co/experiences/arte-cultura',
  '/en-mx/packages/familia-europa',
  '/en/blog/mexico',
  '/en/blog/post/seguro-viaje-europa',
  '/robots.txt',
  '/sitemaps/sitemap_index.xml'
];

async function testUrl(url) {
  try {
    const baseUrl = 'http://localhost:5000';
    const fullUrl = baseUrl + url;
    const response = await fetch(fullUrl, { 
      method: 'HEAD',
      redirect: 'follow'
    });
    
    const status = response.status;
    const statusIcon = status === 200 ? 'OK' : 'FAIL';
    
    console.log(`[${statusIcon}] ${status} - ${url}`);
    
    return { url, status, success: status === 200 };
  } catch (error) {
    console.log(`[ERROR] - ${url} - ${error.message}`);
    return { url, status: 'ERROR', success: false, error: error.message };
  }
}

async function runTests() {
  console.log('Starting URL tests...\n');
  console.log(`Base URL: http://localhost:5000`);
  console.log(`Total URLs to test: ${testUrls.length}\n`);
  
  const results = [];
  
  for (const url of testUrls) {
    const result = await testUrl(url);
    results.push(result);
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  console.log('\n--- SUMMARY ---\n');
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`Successful: ${successful}/${testUrls.length}`);
  console.log(`Failed: ${failed}/${testUrls.length}`);
  console.log(`Success rate: ${((successful/testUrls.length)*100).toFixed(2)}%`);
  
  if (failed > 0) {
    console.log('\nFailed URLs:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.url} (${r.status})`);
    });
  }
  
  console.log('\nTests completed');
  
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
