const mongoose = require("mongoose");
const dotenv = require("dotenv");
const FreedomFighter = require("./models/FreedomFighter");
const Activity = require("./models/Activity");
const connectDB = require("./config/db");

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        await Activity.deleteMany({});
        await FreedomFighter.deleteMany({});

        console.log("Data cleared. Seeding 30 freedom fighters...");

        const fighters = [
            {
                name: "Mahatma Gandhi",
                role: "Father of the Nation",
                description: `**Mohandas Karamchand Gandhi** was an Indian lawyer, anti-colonial nationalist and political ethicist who employed nonviolent resistance to lead the successful campaign for India's independence from British rule.

**Key Achievements:**
* Led the **Dandi Salt March** in 1930.
* Championed **Satyagraha** (truth-force).
* Inspired movements for civil rights and freedom across the world.`,
                born: "2 October 1869",
                died: "30 January 1948",
                location: "Porbandar, Gujarat",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Mahatma-Gandhi-profile.jpg",
            },
            {
                name: "Bhagat Singh",
                role: "Revolutionary Socialist",
                description: `**Bhagat Singh** was a charismatic Indian revolutionary who participated in the mistaken murder of a junior British police officer in what was to be retaliation for the death of an Indian nationalist.

**Legacy:**
* Symbol of **youthful sacrifice** and courage.
* Popularized the slogan **'Inquilab Zindabad'**.
* His execution at age 23 made him a folk hero of the Indian independence movement.`,
                born: "28 September 1907",
                died: "23 March 1931",
                location: "Banga, Punjab",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/54/Bhagat_Singh_1929.jpg",
            },
            {
                name: "Subhas Chandra Bose",
                role: "Leader of Indian National Army",
                description: `**Subhas Chandra Bose** was an Indian nationalist whose defiant patriotism made him a hero in India, but whose attempts during World War II to rid India of British rule with the help of Nazi Germany and Imperial Japan left a troubled legacy.

**Notable Actions:**
* Founded the **Indian National Army (INA)**.
* Gave the famous slogan **"Give me blood, and I shall give you freedom!"**
* Established the **Azad Hind Government** in exile.`,
                born: "23 January 1897",
                died: "18 August 1945",
                location: "Cuttack, Odisha",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Subhas_Chandra_Bose_1945.jpg",
            },
            {
                name: "Jawaharlal Nehru",
                role: "First Prime Minister of India",
                description: `**Jawaharlal Nehru** was an Indian independence activist and subsequently the first Prime Minister of India. A central figure in Indian politics before and after independence, he emerged as the paramount leader of the Indian independence movement.`,
                born: "14 November 1889",
                died: "27 May 1964",
                location: "Allahabad, Uttar Pradesh",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Jawaharlal_Nehru_1946.jpg",
            },
            {
                name: "Sardar Vallabhbhai Patel",
                role: "Iron Man of India",
                description: `**Vallabhbhai Patel** was an Indian barrister and statesman who served as the first Deputy Prime Minister of India. He is known for his role in the country's struggle for independence and his efforts to integrate the princely states into the Indian Union.`,
                born: "31 October 1875",
                died: "15 December 1950",
                location: "Nadiad, Gujarat",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/00/Sardar_Patel_1875-1950.jpg",
            },
            {
                name: "Rani Lakshmibai",
                role: "Queen of Jhansi",
                description: `**Rani Lakshmibai** was the queen of the princely state of Jhansi in North India. She was one of the leading figures of the Indian Rebellion of 1857 and became a symbol of resistance to British rule.`,
                born: "19 November 1828",
                died: "18 June 1858",
                location: "Varanasi, Uttar Pradesh",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Rani_Lakshmibai.jpg",
            },
            {
                name: "Chandrashekhar Azad",
                role: "Revolutionary Leader",
                description: `**Chandrashekhar Azad** was an Indian revolutionary who reorganised the Hindustan Republican Association under the name of Hindustan Socialist Republican Association. He was a mentor to Bhagat Singh and vowed never to be arrested by British police.`,
                born: "23 July 1906",
                died: "27 February 1931",
                location: "Bhavra, Madhya Pradesh",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Chandra_Shekhar_Azad.jpg",
            },
            {
                name: "Mangal Pandey",
                role: "First Martyr of 1857 Revolt",
                description: `**Mangal Pandey** was an Indian soldier who played a key role in the events immediately preceding the outbreak of the Indian rebellion of 1857. He was a sepoy in the 34th Bengal Native Infantry regiment of the British East India Company.`,
                born: "19 July 1827",
                died: "8 April 1857",
                location: "Nagwa, Uttar Pradesh",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Mangal_Pandey.jpg",
            },
            {
                name: "Lala Lajpat Rai",
                role: "Punjab Kesari (Lion of Punjab)",
                description: `**Lala Lajpat Rai** was an Indian author, freedom fighter and politician. He played a pivotal role in the Indian Independence movement and was popularly known as Punjab Kesari. He was one of the three members of the Lal Bal Pal triumvirate.`,
                born: "28 January 1865",
                died: "17 November 1928",
                location: "Dhudike, Punjab",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Lala_Lajpat_Rai.jpg",
            },
            {
                name: "Bal Gangadhar Tilak",
                role: "Father of Indian Unrest",
                description: `**Bal Gangadhar Tilak** was an Indian nationalist, teacher, and independence activist. He was one third of the Lal Bal Pal triumvirate. The British colonial authorities called him "The father of the Indian unrest."`,
                born: "23 July 1856",
                died: "1 August 1920",
                location: "Ratnagiri, Maharashtra",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Bal_Gangadhar_Tilak.jpg",
            },
            {
                name: "Bipin Chandra Pal",
                role: "Revolutionary Leader",
                description: `**Bipin Chandra Pal** was an Indian nationalist, writer, orator, social reformer and freedom fighter. He was one of the three members of the Lal Bal Pal triumvirate. He stood for the Swadeshi movement and advocated radical methods to achieve independence.`,
                born: "7 November 1858",
                died: "20 May 1932",
                location: "Habiganj, Bengal",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Bipin_Chandra_Pal.jpg",
            },
            {
                name: "Sarojini Naidu",
                role: "Nightingale of India",
                description: `**Sarojini Naidu** was an Indian political activist and poet. A proponent of civil rights, women's emancipation, and anti-imperialistic ideas, she was an important figure in India's struggle for independence from colonial rule.`,
                born: "13 February 1879",
                died: "2 March 1949",
                location: "Hyderabad, Telangana",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Sarojini_Naidu.jpg",
            },
            {
                name: "Maulana Abul Kalam Azad",
                role: "Scholar and Independence Activist",
                description: `**Maulana Abul Kalam Azad** was an Indian scholar, Islamic theologian, independence activist, and a senior leader of the Indian National Congress. He became the first Minister of Education in the Indian government.`,
                born: "11 November 1888",
                died: "22 February 1958",
                location: "Mecca, Saudi Arabia",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Maulana_Azad.jpg",
            },
            {
                name: "Rajendra Prasad",
                role: "First President of India",
                description: `**Rajendra Prasad** was an Indian independence activist, lawyer, scholar and subsequently, the first President of India. He joined the Indian National Congress during the Indian Independence Movement and became a major leader from the region of Bihar.`,
                born: "3 December 1884",
                died: "28 February 1963",
                location: "Siwan, Bihar",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/38/Dr_Rajendra_Prasad.jpg",
            },
            {
                name: "Gopal Krishna Gokhale",
                role: "Political Leader and Social Reformer",
                description: `**Gopal Krishna Gokhale** was an Indian liberal political leader and a social reformer during the Indian Independence Movement. He was a senior leader of the Indian National Congress and the founder of the Servants of India Society.`,
                born: "9 May 1866",
                died: "19 February 1915",
                location: "Kotluk, Maharashtra",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Gopal_Krishna_Gokhale.jpg",
            },
            {
                name: "Dadabhai Naoroji",
                role: "Grand Old Man of India",
                description: `**Dadabhai Naoroji** was an Indian political leader, merchant, scholar and writer who served as the second, ninth, and twenty-second President of the Indian National Congress. He was the first Asian to be a British MP.`,
                born: "4 September 1825",
                died: "30 June 1917",
                location: "Mumbai, Maharashtra",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Dadabhai_Naoroji.jpg",
            },
            {
                name: "Khudiram Bose",
                role: "Young Revolutionary",
                description: `**Khudiram Bose** was an Indian revolutionary who opposed British rule of India. He was one of the youngest revolutionaries to be hanged for his involvement in the Muzaffarpur Conspiracy Case at the age of 18.`,
                born: "3 December 1889",
                died: "11 August 1908",
                location: "Midnapore, Bengal",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Khudiram_Bose.jpg",
            },
            {
                name: "Ram Prasad Bismil",
                role: "Revolutionary Poet",
                description: `**Ram Prasad Bismil** was an Indian revolutionary who participated in the Mainpuri Conspiracy of 1918, and the Kakori Conspiracy of 1925. He was also a patriotic poet and wrote in Hindi and Urdu using the pen names Ram, Agyat and Bismil.`,
                born: "11 June 1897",
                died: "19 December 1927",
                location: "Shahjahanpur, Uttar Pradesh",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Ram_Prasad_Bismil.jpg",
            },
            {
                name: "Ashfaqulla Khan",
                role: "Revolutionary Freedom Fighter",
                description: `**Ashfaqulla Khan** was an Indian independence activist in the Indian independence movement. He was hanged for his involvement in the Kakori conspiracy. He was a close associate of Ram Prasad Bismil.`,
                born: "22 October 1900",
                died: "19 December 1927",
                location: "Shahjahanpur, Uttar Pradesh",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Ashfaqulla_Khan.jpg",
            },
            {
                name: "Sukhdev Thapar",
                role: "Revolutionary Freedom Fighter",
                description: `**Sukhdev Thapar** was an Indian revolutionary who worked to make India independent from the British Raj along with his associates Bhagat Singh and Shivaram Rajguru. He was hanged along with them on 23 March 1931.`,
                born: "15 May 1907",
                died: "23 March 1931",
                location: "Ludhiana, Punjab",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Sukhdev_Thapar.jpg",
            },
            {
                name: "Shivaram Rajguru",
                role: "Revolutionary Freedom Fighter",
                description: `**Shivaram Hari Rajguru** was an Indian revolutionary from Maharashtra, known mainly for his involvement in the assassination of a British police officer. He was an active member of the Hindustan Socialist Republican Association.`,
                born: "24 August 1908",
                died: "23 March 1931",
                location: "Khed, Maharashtra",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Shivaram_Rajguru.jpg",
            },
            {
                name: "Begum Hazrat Mahal",
                role: "Queen of Awadh",
                description: `**Begum Hazrat Mahal** was the second wife of Nawab Wajid Ali Shah and one of the leaders of the Indian Rebellion of 1857. She rebelled against the British East India Company during the Indian Rebellion and seized control of Lucknow.`,
                born: "1820",
                died: "7 April 1879",
                location: "Faizabad, Uttar Pradesh",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Begum_Hazrat_Mahal.jpg",
            },
            {
                name: "Tantia Tope",
                role: "General in 1857 Revolt",
                description: `**Tantia Tope** was a general in the Indian Rebellion of 1857 and one of its most effective leaders. He was a personal adherent of Nana Sahib of Bithur and was one of the rebels' most effective generals.`,
                born: "1814",
                died: "18 April 1859",
                location: "Yeola, Maharashtra",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Tantia_Tope.jpg",
            },
            {
                name: "Nana Saheb",
                role: "Leader of 1857 Revolt",
                description: `**Nana Saheb** was an Indian Peshwa of the Maratha empire. An aristocrat and fighter, he led the rebellion in Cawnpore (Kanpur) during the 1857 uprising. He later disappeared and his final fate remains unknown.`,
                born: "19 May 1824",
                died: "1859",
                location: "Bithur, Uttar Pradesh",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Nana_Sahib.jpg",
            },
            {
                name: "Kunwar Singh",
                role: "Leader of 1857 Revolt in Bihar",
                description: `**Kunwar Singh** was a notable leader during the Indian Rebellion of 1857. He belonged to a royal Ujjainiya Rajput house of Jagdispur, currently a part of Bhojpur district, Bihar. At the age of 80, he led a select band of armed soldiers against the British.`,
                born: "13 November 1777",
                died: "26 April 1858",
                location: "Jagdispur, Bihar",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Kunwar_Singh.jpg",
            },
            {
                name: "Kittur Chennamma",
                role: "Queen of Kittur",
                description: `**Kittur Chennamma** was the Rani of Kittur, a former princely state in Karnataka. She led an armed rebellion against the British East India Company in 1824 in defiance of the doctrine of lapse, which was a policy of annexation.`,
                born: "23 October 1778",
                died: "21 February 1829",
                location: "Kakati, Karnataka",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Kittur_Chennamma.jpg",
            },
            {
                name: "Veer Savarkar",
                role: "Revolutionary and Writer",
                description: `**Vinayak Damodar Savarkar** was an Indian independence activist, politician, lawyer, writer, and the formulator of the Hindu nationalist philosophy of Hindutva. He was a leading figure in the Hindu Mahasabha.`,
                born: "28 May 1883",
                died: "26 February 1966",
                location: "Bhagur, Maharashtra",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/Veer_Savarkar.jpg",
            },
            {
                name: "Udham Singh",
                role: "Revolutionary Freedom Fighter",
                description: `**Udham Singh** was an Indian revolutionary belonging to the Ghadar Party, best known for assassinating Michael O'Dwyer in London, who was the Lieutenant Governor of Punjab at the time of the Jallianwala Bagh massacre.`,
                born: "26 December 1899",
                died: "31 July 1940",
                location: "Sunam, Punjab",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Udham_Singh.jpg",
            },
            {
                name: "Bhikaiji Cama",
                role: "Revolutionary and Advocate of Women's Rights",
                description: `**Bhikaiji Rustom Cama** was one of the prominent figures in the Indian independence movement. She unfurled the first version of the Indian national flag at the International Socialist Conference in Stuttgart, Germany, in 1907.`,
                born: "24 September 1861",
                died: "13 August 1936",
                location: "Mumbai, Maharashtra",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Bhikaiji_Cama.jpg",
            },
            {
                name: "Annie Besant",
                role: "Social Reformer and Independence Activist",
                description: `**Annie Besant** was a British socialist, theosophist, women's rights activist, writer, orator, educationist, and philanthropist. She was an ardent supporter of both Irish and Indian self-rule and became the first woman president of the Indian National Congress.`,
                born: "1 October 1847",
                died: "20 September 1933",
                location: "London, England",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Annie_Besant.jpg",
            }
        ];

        await FreedomFighter.insertMany(fighters);
        console.log(`Successfully seeded ${fighters.length} freedom fighters!`);

        // Create admin user
        const bcrypt = require("bcryptjs");
        const adminPassword = await bcrypt.hash("admin123", 10);
        const User = require("./models/User");

        await User.deleteMany({});

        await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: adminPassword,
            role: "admin",
        });
        console.log("Admin user created: admin@example.com / admin123");

        console.log("Seeding completed successfully.");
        process.exit();
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();
