const cds = require('@sap/cds');

module.exports = srv => {
  // Use UPPERCASE names to match your schema
  const { Books, PRODUCTS, SUPPLIERS, CATEGORIES } = cds.entities('MyProject');

  // Helper function to fetch OData list from Northwind
  async function fetchODataList(url) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) {
        const text = await res.text();
        console.error(`[Northwind] HTTP ${res.status} - ${text}`);
        return [];
      }
      const json = await res.json();

      if (Array.isArray(json?.d?.results)) return json.d.results;
      if (Array.isArray(json?.value)) return json.value;

      console.error('[Northwind] Unexpected payload shape:', json);
      return [];
    } catch (err) {
      console.error('[Northwind] Fetch error:', err);
      return [];
    }
  }

  // LogBooks action
  srv.on('LogBooks', async req => {
    const { borrowerID, bookTitle, authorName, readDate } = req.data;
    const tx = cds.transaction(req);
    
    await tx.run(INSERT.into(Books).entries({
      ID: cds.utils.uuid(),
      borrowerID,
      bookTitle,
      authorName,
      readDate
    }));
    
    return `Successfully logged book "${bookTitle}" for ${borrowerID}`;
  });

  // FetchBooks action
  srv.on('FetchBooks', async req => {
    const { borrowerID } = req.data;
    const tx = cds.transaction(req);
    
    const books = await tx.run(
      SELECT.from(Books).where({ borrowerID })
    );
    
    return books;
  });

  // Insert Products from Northwind
  srv.on('insertTBProducts', async req => {
    const tx = cds.transaction(req);
    const url = 'https://services.odata.org/V3/Northwind/Northwind.svc/Products?$format=json';

    const items = await fetchODataList(url);
    if (items.length === 0) return 'No products fetched from Northwind.';

    await tx.run(UPSERT.into(PRODUCTS).entries(items));
    return `Successfully inserted ${items.length} products into the database.`;
  });

  // Insert Suppliers from Northwind
  srv.on('insertTBSuppliers', async req => {
    const tx = cds.transaction(req);
    const url = 'https://services.odata.org/V3/Northwind/Northwind.svc/Suppliers?$format=json';

    const items = await fetchODataList(url);
    if (items.length === 0) return 'No suppliers fetched from Northwind.';

    await tx.run(UPSERT.into(SUPPLIERS).entries(items));
    return `Successfully inserted ${items.length} suppliers into the database.`;
  });

  // Insert Categories from Northwind
  srv.on('insertTBCategories', async req => {
    const tx = cds.transaction(req);
    const url = 'https://services.odata.org/V3/Northwind/Northwind.svc/Categories?$format=json';

    const items = await fetchODataList(url);
    if (items.length === 0) return 'No categories fetched from Northwind.';

    await tx.run(UPSERT.into(CATEGORIES).entries(items));
    return `Successfully inserted ${items.length} categories into the database.`;
  });

  // Fetch combined data
  srv.on('fetchData', async req => {
    const tx = cds.transaction(req);

    const products = await tx.run(SELECT.from(PRODUCTS));
    const suppliers = await tx.run(SELECT.from(SUPPLIERS));
    const categories = await tx.run(SELECT.from(CATEGORIES));

    const supplierMap = new Map(suppliers.map(s => [s.SupplierID, s]));
    const categoryMap = new Map(categories.map(c => [c.CategoryID, c]));

    return products.map(p => {
      const supplier = supplierMap.get(p.SupplierID) || {};
      const category = categoryMap.get(p.CategoryID) || {};
      return {
        ProductID: p.ProductID,
        ProductName: p.ProductName,
        SupplierID: p.SupplierID,
        CompanyName: supplier.CompanyName || '',
        Address: supplier.Address || '',
        City: supplier.City || '',
        Region: supplier.Region || '',
        CategoryName: category.CategoryName || '',
        Description: category.Description || ''
      };
    });
  });
};