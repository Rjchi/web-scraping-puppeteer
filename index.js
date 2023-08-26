const puppeteer = require("puppeteer");

const openWebPage = async () => {
  /**
   * Inicializamos esto nos devuelve un objeto (un navegador).
   * si no deseamos ver lo que hace cambiamos el valor de headless
   * slowMo es para ver lo que hace mas lento(en milisegundos)
   */
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
  });
  // Abrimos una pagina dentro del navegador.
  const page = await browser.newPage();

  // Escribeme en la barra de direcciones esto:
  await page.goto(`https://example.com`);

  // terminamos la ejecución
  await browser.close();
};

// openWebPage();

const captureScreenshoot = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();

  await page.goto(`https://rmovie.netlify.app/`);

  // Tomamos una captura de pantalla y le decimos donde queremos guardarla
  await page.screenshot({ path: "example.png" });

  await browser.close();
};

// captureScreenshoot();

const navigateWebPage = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 300,
  });
  const page = await browser.newPage();

  await page.goto(`https://rmovie.netlify.app/`);

  // Click en la etiqueta a con un valor en especifico.
  await page.click('a[href="/569094"]');

  // Le damos un tiempo de espera antes de cerrar
  await new Promise((r) => setTimeout(r, 3000));

  await browser.close();
};

// navigateWebPage();

const getData = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 300,
  });
  const page = await browser.newPage();

  await page.goto(`https://rmovie.netlify.app/`);

  // con esto hacemos que ejecuto codigo en el navegador con elemento de una pagina web
  const result = await page.evaluate(() => {
    const title = document.querySelector("h1").innerText;
    const description = document.querySelector("p").innerText;
    return {
      title,
      description,
    };
  });
  console.log(result);

  await browser.close();
};

// getData();

const hadleDynamicWebPage = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400,
  });
  const page = await browser.newPage();

  await page.goto(`https://rmovie.netlify.app/`);

  // Seleccionamos todos los elementos que esten en una clase en especifico
  const result = await page.evaluate(() => {
    // Esto toma todo el contenido que hay en un div con una clase en especifico
    const head = document.getElementsByClassName("sc-fujyAs eysHZq");
    // Lo convertimos en un arreglo y buscamos una etiqueta a con un un /id especifico y tomamos su html
    const data = [...head].map((h) => {
      const img = h.querySelector('a[href="/644124"]').innerHTML;
      return img;
    });
    return data;
  });
  console.log(result);

  await browser.close();
};

// hadleDynamicWebPage();

const DynamicPage = async () => {
  const baseURL = "https://gogoanimehd.io/";
  const id = "bungou-stray-dogs-5th-season";
  const episode = "1";
  let link = "";
  const linkSelector = 'a[rel="3"]'
  let nl = [];

  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  // Interceptacion de solicitudes de red
  await page.setRequestInterception(true);

  page.on("request", (request) => {
    if (request.isNavigationRequest() && request.redirectChain().length !== 0) {
      // Bloquear redirecciones
      request.abort();
    } else {
      // Permitir otras solicitudes
      request.continue();
    }
  });

  await page.goto(`${baseURL + id}-episode-${episode}`, { timeout: 50000 });

  // Esperar a que el selector esté visible antes de evaluar
  await page.waitForSelector(linkSelector);

  await page.click('a[rel="3"]');

  await new Promise((r) => setTimeout(r, 3000));

  const result = await page.evaluate(() => {
    const element = document.querySelector('a[rel="3"]');
    if (element) {
        const attributes = Array.from(element.attributes);
        const attributeMap = {};
        attributes.forEach(attr => {
          attributeMap[attr.name] = attr.value;
        });
        return attributeMap;
      } else {
        return null; // O un valor que indique que el elemento no fue encontrado
      }
  });
  console.log(result);

  // Restablecer la interceptación de solicitudes
  await page.setRequestInterception(false);

  await browser.close();
};

DynamicPage();
