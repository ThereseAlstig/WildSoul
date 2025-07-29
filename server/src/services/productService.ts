import pool from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

//getting all products
export const getAllProducts = async () => {
    const query = `
        SELECT 
            p.id AS id,
            p.name AS name,
            p.price,
            p.description,
            p.image_url,
            p.in_stock,

                c1.name AS category_one_name,
                c2.name AS category_two_name,
                w.name AS weather_name,
                wt.name AS weather_temperature_name,
                t2.name AS travel_options

        FROM 
            Products p

            
LEFT JOIN 
    CategoryProduct cp ON p.id = cp.product_id
LEFT JOIN 
    CategoryTwo c2 ON cp.category_id = c2.id AND c2.id IS NOT NULL
  LEFT JOIN 
     CategoryOne c1 ON cp.category_id = c1.id AND c1.id IS NOT NULL

      LEFT JOIN 
        ProductWeather pw ON p.id = pw.product_id
    LEFT JOIN 
        Weather w ON pw.weather_id = w.id
         LEFT JOIN 
        ProductWeatherTemperature pwt ON p.id = pwt.product_id
    LEFT JOIN 
        WeatherTemperature wt ON pwt.temperature_id = wt.id
LEFT JOIN 
    ProductTravel pt ON p.id = pt.product_id
LEFT JOIN 
    TravelOptions t2 ON pt.travel_id = t2.id;
     `;

    try {
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error fetching products:', error);  // Logga eventuella fel
        throw error;  // Släng felet så att det hanteras i någon annan del av koden
    }
};

//Hämtq produkter baserat på namn

export const getProductsByName = async (productName: string) => {
    const query = `
        SELECT 
            p.id AS id,
            p.name AS name,
            p.price,
            p.description,
            p.image_url,
            p.in_stock,
            c1.name AS category_one_name,
            c2.name AS category_two_name,
            w.name AS weather_name,
            wt.name AS weather_temperature_name,
            t2.name AS travel_options
        FROM 
            Products p
        LEFT JOIN 
            CategoryProduct cp ON p.id = cp.product_id
        LEFT JOIN 
            CategoryTwo c2 ON cp.category_id = c2.id AND c2.id IS NOT NULL
        LEFT JOIN 
            CategoryOne c1 ON cp.category_id = c1.id AND c1.id IS NOT NULL
        LEFT JOIN 
            ProductWeather pw ON p.id = pw.product_id
        LEFT JOIN 
            Weather w ON pw.weather_id = w.id
        LEFT JOIN 
            ProductWeatherTemperature pwt ON p.id = pwt.product_id
        LEFT JOIN 
            WeatherTemperature wt ON pwt.temperature_id = wt.id
        LEFT JOIN 
            ProductTravel pt ON p.id = pt.product_id
        LEFT JOIN 
            TravelOptions t2 ON pt.travel_id = t2.id
        WHERE 
            p.name LIKE ?; 
    `;

    try {
        // Använd parameter för att skydda mot SQL-injektion
        console.log('Executing query with:', `%${productName}%`);
        const [rows] = await pool.query(query, [`%${productName}%`]);
        return rows;
    } catch (error) {
        console.error('Error fetching products by name:', error);
        throw error;
    }
};

//hämta och filtrera produkter utifrån olika parametrar, categorie, weather, temperature, travel option
export const getFilteredProductsBY = async (filters: {   
    categoryOne?: string | null;
    categoryTwo?: string | null;
    weather?: string | null;
    temperature?: string | null;
    travelOption?: string | null;}) => {


    // Grundläggande SQL-fråga
    let query = `
     SELECT 
        p.id AS id,
        p.name AS name,
        p.price,
        p.description,
        p.image_url,
        t.name AS travel_option_name, 
        p.in_stock,
        c1.name AS category_one_name,
        c2.name AS category_two_name,
        w.name AS weather_name,
        wt.name AS weather_temperature_name
    FROM 
        Products p
    LEFT JOIN 
        ProductTravel pt ON p.id = pt.product_id
    LEFT JOIN 
        TravelOptions t on pt.travel_id = t.id
    LEFT JOIN 
        CategoryProduct cp ON p.id = cp.product_id
    LEFT JOIN 
        CategoryTwo c2 ON cp.category_id = c2.id
    LEFT JOIN 
        CategoryOne c1 ON c2.category_one_id = c1.id
    LEFT JOIN 
        ProductWeather pw ON p.id = pw.product_id
    LEFT JOIN 
        Weather w ON pw.weather_id = w.id
    LEFT JOIN 
        ProductWeatherTemperature pwt ON p.id = pwt.product_id
    LEFT JOIN 
        WeatherTemperature wt ON pwt.temperature_id = wt.id
   
    `;

    // Förbered WHERE-klausuler baserat på filtren
    let whereClauses = [];

    // Lägg till WHERE-villkor för de parametrar som finns
    if (filters.categoryOne) {
        whereClauses.push(`c1.id = ?`);
    }
    if (filters.categoryTwo) {
        whereClauses.push(`c2.id = ?`);
    }
    if (filters.weather) {
        whereClauses.push(`w.name = ?`);
    }
    if (filters.temperature) {
        whereClauses.push(`wt.name = ?`);
    }
    if (filters.travelOption) {
        whereClauses.push(`t.name = ?`);
    }

    // Om några filter är angivna, lägg till en WHERE-klasul
    if (whereClauses.length > 0) {
        query += ' WHERE ' + whereClauses.join(' AND ');
    }

    try {
        const params: any[] = [];
        if (filters.categoryOne) params.push(filters.categoryOne);
        if (filters.categoryTwo) params.push(filters.categoryTwo);
        if (filters.weather) params.push(filters.weather);
        if (filters.temperature) params.push(filters.temperature);
        if(filters.travelOption) params.push(filters.travelOption);

        

        const [rows] = await pool.query(query, params);
      
        return rows; // Returnera matchande produkter
    } catch (error) {
        console.error('Error in getFilteredProducts:', error);
        throw new Error('Failed to fetch filtered products.');
    }
};


//function to create a product
export const createProduct = async (productData: any) => {
    try {
        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO Products (name, price, description, image_url, in_stock) VALUES (?, ?, ?, ?, ?)',
            [productData.name, productData.price, productData.description, productData.image_url, productData.in_stock]
        );
      
if(productData.travel_option_id && productData.travel_option_id.length > 0) {
const travelValues = productData.travel_option_id.map((travelId: number) => [result.insertId, travelId]);
await pool.query('INSERT INTO ProductTravel (product_id, travel_id) VALUES ?', [travelValues]);
}
if(productData.productCategories && productData.productCategories.length > 0) {
const categoryValues = productData.productCategories.map((categoryId: number) => [result.insertId, categoryId]);
await pool.query('INSERT INTO CategoryProduct (product_id, category_id) VALUES ?', [categoryValues]);

}

        // Om det finns väder-ID:n, koppla dem till produkten
        if (productData.weather_temperature_id && productData.weather_temperature_id.length > 0) {
            const tempValues = productData.weather_temperature_id.map((tempId: number) => [result.insertId, tempId]);
            await pool.query('INSERT INTO ProductWeatherTemperature (product_id, temperature_id) VALUES ?', [tempValues]);
           
        }
        
        if (productData.weather_ids && productData.weather_ids.length > 0) {
          
        
            const weatherValues = productData.weather_ids.map((weatherId: number) => [result.insertId, weatherId]);
           
        
            try {
                const query = 'INSERT INTO ProductWeather (product_id, weather_id) VALUES ?';
                await pool.query(query, [weatherValues]);
               
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Error while linking weather conditions:', error.message);
                } else {
                    console.error('Error while linking weather conditions:', error);
                }
            }
        } else {
            console.log('No weather_ids provided or the array is empty.');
        }
        

        return {productData, productId: result.insertId, message: 'Product created and weather conditions linked.' };
    } catch (error) {
        console.error('Error during product creation:', error);
        if (error instanceof Error) {
            throw new Error('Failed to add product: ' + error.message); // Få mer specifik information om felet
        } else {
            throw new Error('Failed to add product: ' + String(error)); // Fallback for non-Error types
        }
    }

        
    };


    // Funktion för att hämta alla kategorier
export const getAllCategories = async () => {
    const query = `
         SELECT 
            c1.id AS category_one_id, 
            c1.name AS category_one_name, 
            c2.id AS category_two_id, 
            c2.name AS category_two_name
        FROM 
            CategoryOne c1
        LEFT JOIN 
            CategoryTwo c2 ON c1.id = c2.category_one_id
       
    `;

    try {
        // Kör SQL-frågan
        const [rows]: [any[], any] = await pool.query(query);
  

        // Strukturera resultatet så att underkategorier läggs under sina huvudkategorier
        const categories = rows.reduce((acc: any, row: any) => {
            const { category_one_id, category_one_name, category_two_id, category_two_name } = row;

            // Om huvudkategorin inte redan finns i ackumulatorn, lägg till den
            if (!acc[category_one_id]) {
                acc[category_one_id] = {
                    id: category_one_id,
                    name: category_one_name,
                    subcategories: []
                };
            }

            // Om det finns en underkategori, lägg till den under huvudkategorin
            if (category_two_id) {
                acc[category_one_id].subcategories.push({
                    id: category_two_id,
                    name: category_two_name
                });
            }

            return acc;
        }, {});

        // Konvertera objektet till en array
        const result = Object.values(categories);
        return result;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;  // Kasta vidare felet
    }
};


export const getProductById = async (id: number) => {
    if (!id || isNaN(Number(id))) {
        throw new Error('Invalid product ID');
    }
    const query = `
        SELECT 

             p.id AS id,
        p.name AS name,
        p.price,
        p.description,
        p.image_url,
        t.name AS travel_option_name, 
        p.in_stock,
        c1.name AS category_one_name,
        c2.name AS category_two_name,
        w.name AS weather_name,
        wt.name AS weather_temperature_name
        FROM 
            Products p

        LEFT JOIN 
        ProductTravel pt ON p.id = pt.product_id
    LEFT JOIN 
        TravelOptions t on pt.travel_id = t.id
    LEFT JOIN 
        CategoryProduct cp ON p.id = cp.product_id
    LEFT JOIN 
        CategoryTwo c2 ON cp.category_id = c2.id
    LEFT JOIN 
        CategoryOne c1 ON c2.category_one_id = c1.id
    LEFT JOIN 
        ProductWeather pw ON p.id = pw.product_id
    LEFT JOIN 
        Weather w ON pw.weather_id = w.id
    LEFT JOIN 
        ProductWeatherTemperature pwt ON p.id = pwt.product_id
    LEFT JOIN 
        WeatherTemperature wt ON pwt.temperature_id = wt.id
   
        WHERE 
            p.id = ?;  
    `;

    try {
        const [rows]: [any[], any] = await pool.query(query, [id]); // Skicka med ID som parameter
        if (rows.length === 0) {
            return null; // Om ingen produkt hittas, returnera null
        }
    
        return rows[0]; // Returnera den första raden (den enda produkten)
    } catch (error) {
        console.error('Error fetching product by ID:', error);  // Logga eventuella fel
        throw error;  // Släng felet så att det hanteras i någon annan del av koden
    }
};

//hitta id på categorierna
export const getCategoryOneIdByName = async (name: string) => {
    const query = `
        SELECT id 
        FROM CategoryOne 
        WHERE name = ?;
    `;

    try {
        
        // Specificera att resultatet är en array av RowDataPacket
        const [rows] = await pool.query<RowDataPacket[]>(query, [name]);
        
      

        return rows[0].id; // Returnera det första ID:t
    } catch (error) {
        console.error('Error fetching CategoryTwo ID by name:', error);
        throw error; // Släng felet för vidare hantering
    }
};

//Hitta id på subcategorierna
export const getCategoryTwoIdByName = async (name: string): Promise<number | null> => {
    const query = `
        SELECT id 
        FROM CategoryTwo 
        WHERE name = ?;
    `;

    try {
        
        const [rows] = await pool.query<RowDataPacket[]>(query, [name]);
        
        
        if (rows.length === 0) {
            return null; 
        }

        return rows[0].id; 
    } catch (error) {
        console.error('Error fetching CategoryTwo ID by name:', error);
        throw error; 
    }
};

// Function to update the in_stock status of a product
export const updateProductInStock = async (productId: string, inStock: boolean) => {
    try {
      const [result] = await pool.query(
        'UPDATE Products SET in_stock = ? WHERE id = ? LIMIT 1',
        [inStock ? 1 : 0, productId]
      );
  
      if ((result as any).affectedRows === 0) {
        throw new Error('Product not found');
      }
  
      return { success: true, message: 'Product in_stock status updated successfully.' };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update product: ${error.message}`);
      } else {
        throw new Error('Failed to update product: Unknown error');
      }
    }
  };