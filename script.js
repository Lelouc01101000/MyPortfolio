/**
 * portfolio website javascript
 * handles theme switching, language switching, mobile navigation, dynamic content rendering,
 * skill tooltips, video modal interactions, and scroll-based ui effects.
 */

// ==================== cache-busting asset version ====================
// mirrors window.SITE_VERSION, defined once in index.html's <head>.
// appended as "?v=" to every css/js/image/video reference so that bumping
// one value in one place forces browsers to fetch fresh copies of anything
// that changed, without renaming a single file or changing any other line
// beyond one in index.html
const ASSET_VERSION = window.SITE_VERSION || "1.0.0";

// ==================== translation data structure ====================
// object containing all translatable strings for english and georgian.
// georgian values are set to placeholder text for user to replace later.
const translations = {
    en: {
        brand: "Giorgi Glonti",
        nav_about: "Background",
        nav_skills: "Expertise",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_subtitle: "Computer Scientist",
        hero_title: "Giorgi Glonti",
        hero_desc: "This website displays personal projects I have completed along with my background and experiences",
        cta_touch: "Get in Touch",
        about_tag: "background",
        about_title: "Education & Experience",
        edu_title: "Education",
        edu_content: "<p>I have been Computer Science student at TSU since 2023, I am pursuing Bachelores degree and every subject on my course is conducted in English.</p><p>I spent winter semester of 2026 studying at HAW Kiel University in Germany, taking subjects from Masters degree course (because Bachelores degree subjects werent available in English).</p><p>Additionally completed highschool with gold medal. </p>",
        exp_title: "Work Experience",
        exp_content: "<p>I was employeed at 'Institute of Earth Sciences and National Seismic Monitoring Center'</p><p><b>2025 June - 2025 August</b> => Intern</p><p><b>2025 August - 2026 March</b> => Junior Professional at Geodesy Department</p><p>My job was to manage data from seismic sensors, by processing raw data and storing the data on local servers, while also making CSH and Python scripts with intention of automating this process.</p><p>I had to leave the job because I went to Germany for education after February.</p>",
        skills_tag: "expertise",
        skills_title: "Hover over nodes with the mouse",
        tech_skills_title: "Technical Skills",
        gen_know_title: "General Knowledge",
        projects_tag: "My Projects",
        projects_title: "This are the projects made by me, for fun and for enhancing my understanding of programming languages.",
        contact_tag: "Contact",
        contact_title: "Get in Touch",
        contact_phone: "Phone",
        contact_email: "Email",
        contact_location: "Location",
        contact_github: "GitHub",
        location_detail: "Tbilisi, Georgia",
        project_link_text: "View Project",
        play_video: "Play Video"
    },
    ka: {
        brand: "გიორგი ღლონტი",
        nav_about: "გამოცდილება",
        nav_skills: "უნარები",
        nav_projects: "პროექტები",
        nav_contact: "კონტაქტი",
        hero_subtitle: "კომპიუტერული მეცნიერების სტუდენტი",
        hero_title: "გიორგი ღლონტი",
        hero_desc: "ეს ვებსაიტი წარმოგიდგენთ ჩემს პირად პროექტებს და გამოცდილებას.",
        cta_touch: "საკონტაქტო ინფორმაცია",
        about_tag: "გამოცდილება",
        about_title: "განათლება & საქმიანობა",
        edu_title: "განათლება",
        edu_content: "<p>2023 წლიდან ვარ TSU-ს ინგლისურენოვანი კომპიუტერული მეცნიერებების სტუდენტი, ბაკალავრიატზე ვსწავლობ და ჩემი კურსის ყველა საგანი ინგლისურ ენაზე ტარდება.<p></p>2026 წლის ზამთრის სემესტრი გერმანიაში HAW Kiel-ის უნივერსიტეტში ვისწავლე, სადაც მაგისტრატურის კურსის საგნებს ვსწავლობდი (რადგან ბაკალავრის ხარისხის საგნები ინგლისურ ენაზე არ იყო ხელმისაწვდომი).</p><p>ასევე სკოლა ოქროს მედლით დავასრულე.</p>",
        exp_title: "სამუშაო გამოცდილება",
        exp_content: "<p>მე დასაქმებული ვიყავი „სეისმური მონიტორინგის ეროვნულ ცენტრში“</p><p><b>2025 ივნისი - 2025 აგვისტო</b> => სტაჟიორი გეოდეზიის დეპარტამენტში</p><p><b>2025 აგვისტო - 2026 მარტი</b> => უმცროსი სპეციალისტი გეოდეზიის დეპარტამენტში</p><p>ჩემი მოვალეობა იყო სეისმური მოწყობილობებიდან მონაცემების მიღება, მონაცემების დამუშავება და მონაცემების ლოკალურ სერვერებზე შენახვა, ამავდროულად CSH და Python სკრიპტებით ამ პროცესის ავტომატიზაცია.</p><p>სამსახურის დატოვება მომიწია, რადგან თებერვლის შემდეგ გერმანიაში წავედი განათლებისთვის.</p>", 
        skills_tag: "უნარები",
        skills_title: "მაუსი გადაატარეთ უჯრებს რათა დამატებით იხილოთ დეტალური ინფორმაცია",
        tech_skills_title: "ტექნიკური უნარები",
        gen_know_title: "პრაქტიკული უნარები",
        projects_tag: "ჩემი პროექტები",
        projects_title: "ეს არის პროექტები, რომლებიც შევქმენი ჰობისთვის და პროგრამული ენების შესასწავლად, იხილეთ ვიდეო დემონსტრაცია.",
        contact_tag: "კონტაქტი",
        contact_title: " ",
        contact_phone: "Phone",
        contact_email: "Email",
        contact_location: "ლოკაცია",
        contact_github: "GitHub",
        location_detail: "თბილისი",
        project_link_text: "View Project",
        play_video: "Play Video"
    }
};

// ==================== skill tags data with descriptions ====================
// arrays of skill objects containing name and description for tooltip display.
// modify these arrays to add, remove, or update your skills and their descriptions.
const skillsTranslation = {    
    en:{
         technicalSkills: [
            { name: "Data Structures", desc: "Studied it using C++ at universit and individually with C" },
            { name: "Distributed Databases - SQL", desc: "studied Databases at TSU and Distributed Databases at Haw Kiel,which involved simulating Databases that were hosted around the world using tools like CockroachDB, subjects were taught with SQL and PostgreSQL." },
            { name: "Cloud Computing - APIS/Docker", desc: "Took subject at Haw Kiel university called Advanced Cloud Computing where I learned how to manage Cloud environment and my project was in Serverless APIs were I compared Kong and Nginx." },
            { name: "Object Oriented Programming - C++", desc: "Took two courses of Object Oriented programming at the university, one with C++ and one with Python." },
            { name: "Functional Programming - C", desc: "Most of the programming I have done for my projects have been functional programming (while with games I involve object oriented design philosophy given programming languages are inherently designed for functional programming), my experience in C comes from public online course CS50 from Harvard." },
        
            { name: "Python", desc: "I have studied many subjects at university with Python and used it for many programs including but not limited to ones shown in my Projects section" },
            { name: "Web Development", desc: "This website uses HTML CSS and Java Script, 'Typeow' is more advanced website I made that can be seen in project section." },
            { name: "Lua", desc: "Lua is programming language used for 2D games, I took Game Developmed at University were Lua was programming language we studied, I additionally have made Space Shooter game using Lua that can be viewed in my Project section." },
            { name: "Roblox Studio - Luau", desc: "I am currently working on two games in Roblox Studio, which can be viewed down in my Project section." },
            
            { name: "Operating Sytems - Terminal", desc: "I have an understanding of Linux and can comfortably work with its terminal as I used it at my workplace and took Linux subject at university, I have used Debian, Debian based and Ubuntu distributions, I also am very familiar with both Mac OS and Windows environments as I have years of experience with them, additionally I have taken Operating Systems subject at university." },
            { name: "Ubiquitous Computing", desc: "I have worked with Raspberry Pi, my trash detection project was initially developed for it, I have also worked with many embedded technologies at my work place." },
            { name: "Computer Architecture - Assembly", desc: "I have experience with MARS MIPS Assembler made by the Missouri State University, I have used it in three of my university subjects" },
            { name: "Software Engineering/Testing", desc: "I have taken multiple university subjects regarding Software Engineering, Software Architecture, Cybersecurity, Software Testing and etc." },
            { name: "Git/Github/Gitlab", desc: "I have worked with Github, most of my projects are uploaded there, I have used Gitlab at university and I use Git commands whenever I work with a team (so mostly university projects)." },

            { name: "Mathematics", desc: "Mathematics has always been my biggest interest, I have fundamental understanding of Calculas, Linear Algebra, Geometry, Algorithms, Discrete Mathematics, Advanced Statistics and etc." },
        ],
        generalSkills: [
            { name: "Adaptability", desc: "I have knowledge and experience in many different fields which makes it easy for me to adapt to any new field of interest." },
            { name: "Team Collaboration", desc: "University has given me apportunity to work on projects with my coursemates which has requires us to collaborate, additioanlly I am currently working of hobby project which is Farming game on Roblox in a team of 7." },
            { name: "Self Learning", desc: "Lot of the skills I have was acquired outside of university on my own, by experimenting and having interest in making new things." },
            { name: "Clean Management", desc: "I make sure that task I am working on is well managed, planned out and documente." },
            { name: "Communication", desc: "My communication skills are great as I have experience in professional environments." },
            { name: "Foreign Languages", desc: "I can speak Georgian and English fluently, and can understand Russian and German." },
            { name: "Computer Engineering", desc: "My interests are beyond software, I am capable of working with computer hardware and have interest in it." },
        ],
    },

    ka:{
        technicalSkills: [
           { name: "მონაცემთა სტრუქტურები", desc: "ვისწავლე უნივერსიტეტში C++ ენით და ვისწავლე ინდივიდუალურად C-ს გამოყენებით" },
           { name: "Distributed Databases - SQL", desc: "ვსწავლობდი მონაცემთა ბაზებს TSU-ში და განაწილებულ მონაცემთა ბაზებს HAW Kiel-ში, რაც მოიცავდა Cloud-ში მონაცემთა ბაზების განთავსებას სხვადასხვა კონტინეტებზე CockroachDB-ის მსგავსი ინსტრუმენტების გამოყენებით. საგნები ვისწავლე SQL-ისა და PostgreSQL-ის გამოყენებით." },
           { name: "Cloud Computing - APIS/Docker", desc: "Took subject at Haw Kiel university called Advanced Cloud Computing where I learned how to manage Cloud environment and my project was in Serverless APIs were I compared Kong and Nginx." },
           { name: "ობიექტური ორიენტირებული პროგრამირება - C++", desc: "ვისწავლე ობიექტური პროგრამირების ორი საგანი, ერთი Python და მეორე C++." },
           { name: "ფუნქციური პროგრამირება - C", desc: "უმეტესი პროგრამრება ფუნქიური პროგრამირების ენებში მომიწია შესაბამისად აქ მაქვს გამოცდილება, C პროგრამული ენა ვისწავლე საჯარო ონლაინ ლექციით CS50 ჰარვარდის უნივერსიტეტიდან." },
       
           { name: "Python", desc: "Python-ი გამოვიყენე უამრავ პროექტში და უამრავ უნივერსიტეტის საგანში, ასევე სამსახურშიც უმეტესად ამ ენით ვმუშაობდი" },
           { name: "ვებ პროგრამირება - HTML/CSS/JavaScript", desc: "ეს ვებსაიტი იყენებს HTML CSS და Java Script, 'Typeow' არის ჩემი პროექტების სექციაში, რომელიც უფრო კომპლექსური ვებ აპლიკაციაა." },
           { name: "Lua", desc: "Lua არის 2D პროგრამირებას ენა რაც ვისწავლე უნივერსიტეტში Gamde Development-ის საგანში, ასევე Space Shooter თამაში შევქმენი ამ ენით რაც შეგიძლიათ იხილოთ პროექტების სექციაში" },
           { name: "Roblox Studio - Luau", desc: "ამჯერად ვმუშაობ ორ თამაშზე Roblox Studio-ში, რაც შეგიძლიათ იხილოთ პროექტების სექციაში" },
           
           { name: "ოპერაციული სისტემები - Terminal", desc: "კომფორტულად შემიძლია Linux-თან და მის ტერმინალთან მუშაობა, რადგან მას სამსახურში ვიყენებდი და Linux-ის საგანი უნივერსიტეტშიც გავიარე. გამომიყენებია Debian-ის, Debian-ზე დაფუძნებული და Ubuntu-ს დისტრიბუციები. ასევე მრავალწლოვანი გამოცდილება მაქვს Mac Os-თან და Windows-თან. გარდა ამისა, უნივერსიტეტში ოპერაციული სისტემების საგანიც გავიარე." },
           { name: "Ubiquitous Computing", desc: "ვიმუშავე Raspberry Pi-თ ჩემი Trash Detection პროექტი პირველად ამ სისტემისთვის იყო შექმნილი, ასევე გამოცდილება მაქვს Embedded ტექნოლოგიებთან ჩემი სამსახურიდან." },
           { name: "კომპიუტერული არქიტექტურა - Assembly", desc: "გამოცდილება მაქვს MARS MIPS Assembler-თან, შექმნილი Missouri State University-ს მიერ, რომელსაც ვიყენებდი 3 საგანში უნივერსიტეტში." },
           { name: "პროგრამული ინჟინერია/ტესტირება", desc: "უამრავი საგანი ვისწავლე ამ კუთხით უნივერსიტეტში, მაგალითად: პროგრამული ინჟინერია, პროგრამული არქიტექტურა, კიბერუსაფრთხოება, პროგრამული ტესტირება და ა.შ." },
           { name: "Git/Github/Gitlab", desc: "ჩემი პროექტების უმეტესობა Github-ზეა, Gitlab-ს ვიყენებ უნივერსიტეტის პროექტებისთვის და Git ბრძანებებს როედსაც ვმუშაობ გუნდში სადაც Github/lab-ს ვიყენებთ (ანუ უმეტესად უნივერსიტეტის პროექტებისთვის)." },

           { name: "მათემატიკა", desc: "აკადემიური კუთხით მათემატიკა ჩემი მთავარი ინტერესია, მაქვს ფუნდამენტური ცოდნა უამრავი განხრით, მაგალითად: კალკულუსი, წრფივი ალგებრა, გეომეტრია, ალგორითმები, დისკრეტული მათემატიკა, კომპლექსური სტატისტიკა და ა.შ." },
       ],
       generalSkills: [
           { name: "ადაპტირება", desc: "გამოცდილება, ცოდნა და ინტერესი მაქვს სხვადასხვა სფეროებში, რაც მეხმარება ახალი სფეროს მარტივად ათვისებაში." },
           { name: "გუნდური მუშაობა", desc: "კურსელებთან ერთად მიმუშაცია უამრავ პროექტზე უნივერსიტეტში და მაქვს გუნდური მუშაობის გამოცდილება სამსახურიდან, ასევე ვმუშაობა ჰობი პროექტზე, Farming Game on Roblox Studio სადაც 7 ვართ გუნდში." },
           { name: "ინდივიდუალურად სწავლა", desc: "უმეტესი უნარი და ცოდნა რაც მაქვს მივიღე ინდივიდუალური სწავლით, პირად პროექტებზე მუშაობით და უნივერსიტეტის მიღმა განათლების მიღებით." },
           { name: "მკაპიო მანაჯმენტი", desc: "ვაკეთებ შესასრულებელი დავალების მაკაფიო მენეჯმენტს, წინასწარ გეგმის შედგენით და დეტალური დოკუმენტაციით." },
           { name: "კომუნიკაცია", desc: "შემიძლია მარტივად და გამართულად კომუნიკაცია რადგან გამოცდილება მაქვს პროფესიანულ გარემოში." },
           { name: "უცხო ენები", desc: "ინგლისურს ვიყენებ სწავლისას და უფრო მეტად მიწევს ინგლისურად საუბარი ვიდრე ქართულად კომუნიკაციისთვის, ასევე მაქვს დაბალი დონის ცოდნა რუსულში და გერმანულში სადაც შემიძლია მინიმალური საუბარი და მოსმენა" },
           { name: "კომპიუტერული ინჟინერია", desc: "ჩემი ინტერესი არამხოლოდ Software-შია მაგრამ ასევე Hardware-ში, შემიძლია კომპიუტერის ფიზიკურ ნაწილებთან მუშაობა." },
       ],
   },
}

// ==================== project data structure ====================
// array of project objects containing metadata for each portfolio project.
// filename format: spaces replaced with underscores for asset naming.
// lang property determines the programming language badge displayed.
const projectsTranslation = {
    en:[
        {
            name: "Trash Classifier",
            filename_image: "assets/images/Trasheow",
            filename_video: "assets/videos/Trasheow",
            lang: "Python",
            langClass: "lang-python",
            description: "Trasheow is a Trash Classifier software, which can detect what type of waste youre holding (e.g, glass, wood, metal, e-waste and etc).",
            link: "PROJECT_LINK_PLACEHOLDER",
            linkPlaceholder: true,
            githubLink: "https://github.com/Lelouc01101000/Trasheow",
            links: {
                project: { show: false, position: "left" },
                github: { show: true, position: "left" }
            }
        },
        {
            name: "Space Shooter",
            filename_image: "assets/images/Space_Shooter",
            filename_video: "assets/videos/Space_Shooter",
            lang: "Lua",
            langClass: "lang-lua",
            description: "Spaceow is a Space Shooter game, it has multiple enemies which behave differently based on players input and position, games design was inspired by Shimeji Simulation.",
            link: "https://lelouc01101000.itch.io/spaceow",
            linkPlaceholder: true,
            githubLink: "https://github.com/Lelouc01101000/Spaceow",
            links: {
                project: { show: true, position: "left" },
                github: { show: true, position: "right" }
            }
        },
        {
            name: "Typeow",
            filename_image: "assets/images/Typeow",
            filename_video: "assets/videos/Typeow",
            lang: "JavaScript",
            langClass: "lang-javascript",
            description: "Typeow is Typing web application, were user can type and check how fast they are capable of typing, measurment of Words Per Minute is used which cosniders 5 characters a word.",
            link: "https://lelouc01101000.github.io/Typeow/",
            linkPlaceholder: true,
            githubLink: "https://github.com/Lelouc01101000/Typeow",
            links: {
                project: { show: true, position: "left" },
                github: { show: true, position: "right" }
            }
        },
        {
            name: "Hexagonal Chess",
            filename_image: "assets/images/Hexagonal_Chess",
            filename_video: "assets/videos/Hexagonal_Chess",
            lang: "Python",
            langClass: "lang-python",
            description: "Hexeow is Hexagonal Chess software developed using pygame, rules for this game were made by Władysław Gliński.",
            link: "PROJECT_LINK_PLACEHOLDER",
            linkPlaceholder: true,
            githubLink: "https://github.com/Lelouc01101000/Hexeow",
            links: {
                project: { show: false, position: "left" },
                github: { show: true, position: "left" }
            }
        },
        {
            name: "Auto Clicker",
            filename_image: "assets/images/Auto_Clicker",
            filename_video: "assets/videos/Auto_Clicker",
            lang: "Python",
            langClass: "lang-python",
            description: "Macreow is Auto Clicker which can automatically send keyboard and mouse clicks in desired time interval and frequency.",
            link: "PROJECT_LINK_PLACEHOLDER",
            linkPlaceholder: true,
            githubLink: "https://github.com/Lelouc01101000/Macreow",
            links: {
                project: { show: false, position: "left" },
                github: { show: true, position: "left" }
            }
        },
        {
            name: "JoJo game on Roblox",
            filename_image: "assets/images/JoJo_game_on_Roblox",
            filename_video: "assets/videos/JoJo_game_on_Roblox",
            lang: "Luau",
            langClass: "lang-luau",
            description: "Iris Simulation is a game on roblox which was inspired by fictional story called JoJo's Bizarre Adventure, game is still in development but there is a demo version to play.",
            link: "https://www.roblox.com/games/100999089423920/iris-simulation",
            linkPlaceholder: true,
            githubLink: "GITHUB_LINK_PLACEHOLDER",
            links: {
                project: { show: true, position: "left" },
                github: { show: false, position: "right" }
            }
        },
        {
            name: "Farming game on Roblox",
            filename_image: "assets/images/Farming_game_on_Roblox",
            filename_video: "assets/videos/Farming_game_on_Roblox",
            lang: "Luau",
            langClass: "lang-luau",
            description: "Farmtopia is a Farming game on roblox which I am working on in the team of 7, it is a hobby project and we expect it to be fully finished in a year, there is no demo version publically available but video is given.",
            link: "PROJECT_LINK_PLACEHOLDER",
            linkPlaceholder: true,
            githubLink: "GITHUBT_LINK_PLACEHOLDER",
            links: {
                project: { show: false, position: "left" },
                github: { show: false, position: "left" }
            }
        },
        {
            name: "Jateow",
            filename_image: "assets/images/Jateow",
            filename_video: "assets/videos/Jateow",
            lang: "HTML",
            langClass: "lang-HTML",
            description: "Jateow is a website I made for tracking job applications, it can track jobs you applied for, you can modifie it to 'interview' or 'rejected' and other statuses, data will be stored in local storage of your browser.",
            link: "https://lelouc01101000.github.io/Jateow/",
            linkPlaceholder: true,
            githubLink: "https://github.com/Lelouc01101000/Jateow",
            links: {
                project: { show: true, position: "left" },
                github: { show: true, position: "right" }
            }
        },
        {
            name: "Caleow",
            filename_image: "assets/images/Caleow",
            filename_video: "assets/videos/Caleow",
            lang: "JavaScript",
            langClass: "lang-javascript",
            description: "Caleow is an application for counting your daily calories. You can write the names of foods/ingredients along with their quantity (grams/oz) and know how many calories you have consumed. There is also a built in BMI calculator which lets you know how many calories you need to consume to lose, maintain, or gain weight.",
            link: "https://lelouc01101000.github.io/Caleow/",
            linkPlaceholder: true,
            githubLink: "https://github.com/Lelouc01101000/Caleow",
            links: {
                project: { show: true, position: "left" },
                github: { show: true, position: "right" }
            }
        }
    ],
    ka:[
        {
            name: "Trash Classifier",
            filename_image: "assets/images/Caleow",
            filename_video: "assets/videos/Caleow",
            lang: "Python",
            langClass: "lang-python",
            description: "Trasheow არის ნაგვის კლასიფირების პროგრამა, რომელსაც შეუძლია დააფიქსიროს რა ტიპის ნაგავს ხედავს კამერა (მაგალითად: შუშა, ხე, მეტალი, ელექტრონული და ა.შ).",
            link: "PROJECT_LINK_PLACEHOLDER",
            linkPlaceholder: true,
            githubLink: "https://github.com/Lelouc01101000/Trasheow",
            links: {
                project: { show: false, position: "left" },
                github: { show: true, position: "left" }
            }
        },
        {
            name: "Space Shooter",
            filename_image: "assets/images/Space_Shooter",
            filename_video: "assets/videos/Space_Shooter",
            lang: "Lua",
            langClass: "lang-lua",
            description: "Spaceow არის Space Shooter სტილის 2D თამაში, სადაც მოთამაშე არის კოსმოსური თვითფრინავის მართველი და ესვრის მეტეორებს.",
            link: "https://lelouc01101000.itch.io/spaceow",
            linkPlaceholder: true,
            githubLink: "https://github.com/Lelouc01101000/Spaceow",
            links: {
                project: { show: true, position: "left" },
                github: { show: true, position: "right" }
            }
        },
        {
            name: "Typeow",
            filename_image: "assets/images/Typeow",
            filename_video: "assets/videos/Typeow",
            lang: "JavaScript",
            langClass: "lang-javascript",
            description: "Typeow არის წერითი web აპლიკაცია, სადაც მომხმარებელს შეუძლია დაწეროს და შეამოწმოს რამდენად სწრაფად შეუძლია წერა. პროგრამა იყენებს ინგლისური სიტყვების ბიბლიოთეკას და საბოლოო შედეგში 1 სიტყვად თვლის 5 ასოს.",
            link: "https://lelouc01101000.github.io/Typeow/",
            linkPlaceholder: true,
            githubLink: "https://github.com/Lelouc01101000/Typeow",
            links: {
                project: { show: true, position: "left" },
                github: { show: true, position: "right" }
            }
        },
        {
            name: "Hexagonal Chess",
            filename_image: "assets/images/Hexagonal_Chess",
            filename_video: "assets/videos/Hexagonal_Chess",
            lang: "Python",
            langClass: "lang-python",
            description: "Hexeow არის ჰეხაქონალური ჭადრაკი შექმნილი pygame ბიბლიოთეკით, თამაშის წესები შექმნილი იყო Władysław Gliński-ს მიერ.",
            link: "PROJECT_LINK_PLACEHOLDER",
            linkPlaceholder: true,
            githubLink: "https://github.com/Lelouc01101000/Hexeow",
            links: {
                project: { show: false, position: "left" },
                github: { show: true, position: "left" }
            }
        },
        {
            name: "Auto Clicker",
            filename_image: "assets/images/Auto_Clicker",
            filename_video: "assets/videos/Auto_Clicker",
            lang: "Python",
            langClass: "lang-python",
            description: "Macreow არის Auto Clicker რომელიც ავტომატურად აგზავნის მაუსის და კლავიატურის ღილაკის დაწკაპუნებას სასურველი დროის ინტერვალით და სიხშირით.",
            link: "PROJECT_LINK_PLACEHOLDER",
            linkPlaceholder: true,
            githubLink: "https://github.com/Lelouc01101000/Macreow",
            links: {
                project: { show: false, position: "left" },
                github: { show: true, position: "left" }
            }
        },
        {
            name: "JoJo game on Roblox",
            filename_image: "assets/images/JoJo_game_on_Roblox",
            filename_video: "assets/videos/JoJo_game_on_Roblox",
            lang: "Luau",
            langClass: "lang-luau",
            description: "Iris Simulation არის თამაში რომელზეც ვმუშაობ roblox პლათფორმაზე, რომელიც შთაგონებული იყო ანიმაციით JoJo's Bizarre Adventure, თამაში დეველოპმენტშია მაგრამ დემო ვერსიის თამაში შეგიძლიათ.",
            link: "https://www.roblox.com/games/100999089423920/iris-simulation",
            linkPlaceholder: true,
            githubLink: "https://github.com/Lelouc01101000/JoJo-game-on-Roblox",
            links: {
                project: { show: true, position: "left" },
                github: { show: false, position: "right" }
            }
        },
        {
            name: "Farming game on Roblox",
            filename_image: "assets/images/Farming_game_on_Roblox",
            filename_video: "assets/videos/Farming_game_on_Roblox",
            lang: "Luau",
            langClass: "lang-luau",
            description: "Farmtopia არის ფარმის სტილის თამაში roblox პლატფორმაზე, თამაშზე ვმუშაობ გუნდში სადაც 7 ვართ, ეს ჰობი პროექტია და ველით რომ 1 წელში დასრულდება, დემო ვერსია საჯაროდ არ არის თუმცა შეგიძლიათ იხილოთ ვიდეო.",
            link: "PROJECT_LINK_PLACEHOLDER",
            linkPlaceholder: true,
            githubLink: "GITHUB_LINK_PLACEHOLDER",
            links: {
                project: { show: false, position: "left" },
                github: { show: false, position: "right" }
            }
        },
        {
            name: "Jateow",
            filename_image: "assets/images/Jateow",
            filename_video: "assets/videos/Jateow",
            lang: "HTML",
            langClass: "lang-HTML",
            description: "Jateow არის ვებგვერდი სადაც შეგიძლიათ თვალყური ადევნოთ თქვენს მიერ გაგზავნილ სამუშაო განცხადებებს, მონაცემები შეინახება თქვენი ბრაუზერის ლოკალურ მეხსიერებაში.",
            link: "https://lelouc01101000.github.io/Jateow/",
            linkPlaceholder: true,
            githubLink: "https://github.com/Lelouc01101000/Jateow",
            links: {
                project: { show: true, position: "left" },
                github: { show: true, position: "right" }
            }
        },
        {
            name: "Caleow",
            filename_image: "assets/images/Caleow",
            filename_video: "assets/videos/Caleow",
            lang: "JavaScript",
            langClass: "lang-javascript",
            description: "Caleow არის აპლიკაცია დღიური კალორიების დასათვლელად, სადაც შეგიძლიათ ჩაწეროთ თქვენი დღიური საჭმლების/ინგრედიენტების სახელები, მიუთითოთ გრამული რაოდენობა და მიიღებთ ჯამურ დღიურ კალორიებს, ასევე BMI კალკულატორი რათა გაიგოთ რამდენი კალორია უნდა მიიღოთ რომ წონა დაიკლოთ, შეინარჩუნოთ ან მოიმატოთ.",
            link: "https://lelouc01101000.github.io/Caleow/",
            linkPlaceholder: true,
            githubLink: "https://github.com/Lelouc01101000/Caleow",
            links: {
                project: { show: true, position: "left" },
                github: { show: true, position: "right" }
            }
        }
    ],
}


// ==================== current state ====================
// stores the active language code, defaults to english.
let currentLang = "";

// ==================== dom element references ====================
// cache frequently accessed dom elements to avoid repeated queryselector calls.
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const scrollTopBtn = document.getElementById("scrollTop");
const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const modalTitle = document.getElementById("modalTitle");
const skillTooltip = document.getElementById("skillTooltip");
const speedButtons = document.querySelectorAll(".speed-btn");

// ==================== initialization ====================
// runs when the dom is fully loaded and ready for manipulation.
document.addEventListener("DOMContentLoaded", function() {
    initTheme();
    applyAssetVersioning();
    switchLanguage("en");
    renderSkillTags();
    renderProjectCards();
    setupNavLinks();
    setupScrollListeners();
    setupNavbarScroll();
    setupSkillTooltips();
    setupPlaybackSpeedControls();
});

// ==================== asset cache-busting ====================
/**
 * applies the ?v= version query string to static assets that live directly
 * in the html markup. the profile image is given as data-src rather than
 * src precisely so the browser never issues an unversioned request before
 * this function runs.
 */
function applyAssetVersioning() {
    const profileImage = document.getElementById("profileImage");
    if (profileImage && profileImage.dataset.src) {
        profileImage.src = profileImage.dataset.src + "?v=" + ASSET_VERSION;
    }
}

// ==================== theme switching ====================
/**
 * initializes the theme based on localstorage preference or system preference.
 * defaults to dark mode if no preference is stored.
 */
function initTheme() {
    const storedTheme = localStorage.getItem("portfolio-theme");
    if (storedTheme) {
        document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
        // default to dark mode
        document.documentElement.setAttribute("data-theme", "dark");
    }
}

/**
 * toggles between dark and light themes.
 * updates the data-theme attribute on the html element and persists choice to localstorage.
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
}

// ==================== navigation smooth scrolling ====================
/**
 * sets up click event listeners on all navigation links to enable smooth scrolling.
 * prevents default anchor behavior and uses scrollintoview for reliable section navigation.
 */
function setupNavLinks() {
    document.querySelectorAll(".nav-link, .cta-button[href^='#']").forEach(function(link) {
        link.addEventListener("click", function(event) {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#")) {
                event.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });
}

// ==================== language switching ====================
/**
 * switches the website language between english and georgian.
 * updates all elements with data-key attributes and toggles active state on lang buttons.
 * @param {string} lang - language code to switch to ('en' or 'ka')
 */
function switchLanguage(lang) {
    if (lang === currentLang) return;
    currentLang = lang;

    // update all elements that have a data-key attribute matching translation keys
    document.querySelectorAll("[data-key]").forEach(function(element) {
        const key = element.getAttribute("data-key");
        if (translations[lang][key]) {
            // use innerhtml for content that may contain html tags, otherwise textcontent
            if (key === "edu_content" || key === "exp_content") {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // update active state on language toggle buttons
    document.querySelectorAll(".lang-btn").forEach(function(btn) {
        btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    // update html lang attribute for accessibility and seo
    document.documentElement.lang = lang === "ka" ? "ka" : "en";

    // rebuild skills and projects after language change
    renderSkillTags();
    renderProjectCards();
}

// ==================== mobile menu toggle ====================
/**
 * toggles the mobile navigation dropdown menu open/closed state.
 * animates the hamburger icon bars into an x shape when open.
 */
function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains("open");
    if (isOpen) {
        closeMobileMenu();
    } else {
        mobileMenu.classList.add("open");
        hamburger.classList.add("active");
        // prevent body scroll when menu is open
        document.body.style.overflow = "hidden";
    }
}

/**
 * closes the mobile navigation dropdown menu.
 * resets hamburger icon to default state and restores body scroll.
 */
function closeMobileMenu() {
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("active");
    document.body.style.overflow = "";
}

// ==================== scroll-based ui effects ====================
/**
 * sets up scroll event listeners for navbar and scroll-to-top button.
 */
function setupScrollListeners() {
    // toggle scroll-to-top button visibility based on scroll position
    window.addEventListener("scroll", function() {
        const scrollY = window.scrollY || window.pageYOffset;
        if (scrollY > 500) {
            scrollTopBtn.classList.add("visible");
        } else {
            scrollTopBtn.classList.remove("visible");
        }
    });
}

/**
 * adds scroll event listener to navbar for background opacity change.
 */
function setupNavbarScroll() {
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

/**
 * smoothly scrolls the viewport back to the top of the page.
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ==================== skill tags rendering ====================
/**
 * dynamically generates skill tag elements from the skill arrays.
 * creates span elements with the skill-tag class and appends them to their respective containers.
 * each tag stores its description in a data attribute for tooltip access.
 */
function renderSkillTags() {
    const techContainer = document.getElementById("technicalSkills");
    const generalContainer = document.getElementById("generalSkills");

    if (techContainer) {
        techContainer.innerHTML = "";
        skillsTranslation[currentLang].technicalSkills.forEach(function(skill) {
            const tag = document.createElement("span");
            tag.className = "skill-tag";
            tag.textContent = skill.name;
            tag.setAttribute("data-description", skill.desc);
            techContainer.appendChild(tag);
        });
    }

    if (generalContainer) {
        generalContainer.innerHTML = "";
        skillsTranslation[currentLang].generalSkills.forEach(function(skill) {
            const tag = document.createElement("span");
            tag.className = "skill-tag";
            tag.textContent = skill.name;
            tag.setAttribute("data-description", skill.desc);
            generalContainer.appendChild(tag);
        });
    }
}

// ==================== skill tooltip interactions ====================
/**
 * sets up mouse event listeners on skill tags to show/hide the tooltip.
 * tooltip is positioned fixed and follows the cursor or sits below the hovered tag.
 */
function setupSkillTooltips() {
    function hideTooltip() {
        skillTooltip.classList.remove("visible");
        skillTooltip.classList.remove("tooltip-above");
    }

    document.addEventListener("mouseover", function (event) {
        const tag = event.target.closest(".skill-tag");
        if (!tag) return;

        const description = tag.getAttribute("data-description");
        if (!description) return;

        skillTooltip.textContent = description;
        skillTooltip.classList.add("visible");
        positionTooltip(tag);
    });

    document.addEventListener("mouseout", function (event) {
        const tag = event.target.closest(".skill-tag");
        if (!tag) return;

        // hide immediately when leaving the tag
        hideTooltip();
    });

    // hide instantly when scrolling so it does not “follow” the page
    window.addEventListener("scroll", hideTooltip, { passive: true });
    window.addEventListener("wheel", hideTooltip, { passive: true });
    window.addEventListener("touchmove", hideTooltip, { passive: true });

    // keep position correct while hovering
    document.addEventListener("mousemove", function () {
        if (!skillTooltip.classList.contains("visible")) return;

        const tag = document.querySelector(".skill-tag:hover");
        if (tag) {
            positionTooltip(tag);
        }
    });
}

/**
 * positions the tooltip element below the given skill tag.
 * centers the tooltip horizontally relative to the tag and ensures it stays within viewport bounds.
 * @param {HTMLElement} tag - the skill tag element to position the tooltip under
 */

function positionTooltip(tag) {
    const tagRect = tag.getBoundingClientRect();
    const tooltipRect = skillTooltip.getBoundingClientRect();

    const padding = 12;
    const gap = 10;

    let left = tagRect.left + (tagRect.width / 2) - (tooltipRect.width / 2);
    left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));

    const spaceBelow = window.innerHeight - tagRect.bottom;
    const spaceAbove = tagRect.top;

    let top;
    const showBelow = spaceBelow >= tooltipRect.height + gap || spaceBelow >= spaceAbove;

    if (showBelow) {
        top = tagRect.bottom + gap;
        skillTooltip.classList.remove("tooltip-above");
    } else {
        top = tagRect.top - tooltipRect.height - gap;
        skillTooltip.classList.add("tooltip-above");
    }

    skillTooltip.style.left = `${left}px`;
    skillTooltip.style.top = `${top}px`;
}




// ==================== project cards rendering ====================
/**
 * dynamically generates project card html from the projectsdata array.
 * each card includes a thumbnail with language badge and play overlay, title, description, and external link.
 * filenames follow the pattern: project_name_with_underscores.jpg and .mp4
 */
function renderProjectCards() {
    const grid = document.getElementById("projectsGrid");
    if (!grid) return;

    grid.innerHTML = "";

    projectsTranslation[currentLang].forEach(function(project) {
        const card = document.createElement("div");
        card.className = "project-card";

        const imageFile = project.filename_image + ".jpg?v=" + ASSET_VERSION;
        const videoFile = project.filename_video + ".mp4?v=" + ASSET_VERSION;

        const linksRowHtml = buildProjectLinksRow(project);

        card.innerHTML =
            '<div class="project-thumbnail" onclick="openVideoModal(\'' + videoFile + '\', \'' + project.name + '\')">' +
                '<img src="' + imageFile + '" alt="' + project.name + ' thumbnail" loading="lazy">' +
                '<div class="project-lang-badge ' + project.langClass + '">' +
                    '<span class="lang-dot"></span>' +
                    '<span>' + project.lang + '</span>' +
                '</div>' +
                '<div class="play-overlay">' +
                    '<div class="play-button">' +
                        '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">' +
                            '<polygon points="5 3 19 12 5 21 5 3"/>' +
                        '</svg>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="project-info">' +
                '<h3 class="project-title">' + project.name + '</h3>' +
                '<p class="project-description">' + project.description + '</p>' +
                linksRowHtml +
            '</div>';

        grid.appendChild(card);
    });
}

/**
 * builds the "view project" and "github" button markup for a project card,
 * respecting each project's configured visibility (show/hide) and slot
 * (left/right) as defined in its `links` object.
 * returns an empty string if neither button is enabled, so no empty
 * row is left behind in the card layout.
 * @param {object} project - project object from projectsTranslation
 * @returns {string} html for the project-links row, or "" if nothing to show
 */
function buildProjectLinksRow(project) {
    const config = project.links || {};
    const projectConfig = config.project || { show: false };
    const githubConfig = config.github || { show: false };

    let leftHtml = "";
    let rightHtml = "";

    if (projectConfig.show) {
        const html = buildViewProjectButton(project);
        if (projectConfig.position === "right") {
            rightHtml += html;
        } else {
            leftHtml += html;
        }
    }

    if (githubConfig.show) {
        const html = buildGithubButton(project);
        if (githubConfig.position === "right") {
            rightHtml += html;
        } else {
            leftHtml += html;
        }
    }

    if (!leftHtml && !rightHtml) {
        return "";
    }

    return (
        '<div class="project-links">' +
            '<div class="project-links-slot project-links-left">' + leftHtml + '</div>' +
            '<div class="project-links-slot project-links-right">' + rightHtml + '</div>' +
        '</div>'
    );
}

/**
 * builds the "view project" button html, linking out to the project's external url.
 * @param {object} project - project object from projectsTranslation
 * @returns {string} anchor tag html
 */
function buildViewProjectButton(project) {
    return (
        '<a href="' + project.link + '" target="_blank" rel="noopener noreferrer" class="project-link">' +
            '<span data-key="project_link_text">' + translations[currentLang].project_link_text + '</span>' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                '<path d="M7 17L17 7"/>' +
                '<path d="M7 7h10v10"/>' +
            '</svg>' +
        '</a>'
    );
}

/**
 * builds the "github" button html, linking out to the project's github repository.
 * @param {object} project - project object from projectsTranslation
 * @returns {string} anchor tag html
 */
function buildGithubButton(project) {
    return (
        '<a href="' + project.githubLink + '" target="_blank" rel="noopener noreferrer" class="project-link project-link-github" aria-label="View on GitHub">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">' +
                '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>' +
            '</svg>' +
            '<span>GitHub</span>' +
        '</a>'
    );
}

// ==================== video modal ====================
/**
 * opens the video modal and loads the specified video file.
 * pauses any currently playing video before opening new one.
 * @param {string} videoSrc - path to the mp4 video file
 * @param {string} title - project name to display in modal header
 */
function openVideoModal(videoSrc, title) {
    // pause current video if playing to prevent audio overlap
    if (!modalVideo.paused) {
        modalVideo.pause();
    }

    // set new video source and modal title
    modalVideo.src = videoSrc;
    modalVideo.load();
    modalTitle.textContent = title;

    // reset playback speed to normal for every newly opened video
    modalVideo.playbackRate = 1;
    speedButtons.forEach(function(btn) {
        btn.classList.toggle("active", btn.getAttribute("data-speed") === "1");
    });

    // display modal with css transition
    videoModal.classList.add("active");
    document.body.style.overflow = "hidden";

    // auto-play video when modal opens (browser policies may block this)
    modalVideo.play().catch(function(error) {
        // autoplay was prevented by browser, user can click play manually
        console.log("autoplay prevented:", error.message);
    });
}

/**
 * wires up the playback speed buttons in the video modal.
 * clicking a button sets the video's playbackRate and highlights it as active.
 */
function setupPlaybackSpeedControls() {
    speedButtons.forEach(function(btn) {
        btn.addEventListener("click", function() {
            const speed = parseFloat(btn.getAttribute("data-speed"));
            modalVideo.playbackRate = speed;

            speedButtons.forEach(function(b) {
                b.classList.remove("active");
            });
            btn.classList.add("active");
        });
    });
}

/**
 * closes the video modal and pauses the currently playing video.
 * resets body scroll behavior.
 */
function closeVideoModal() {
    videoModal.classList.remove("active");
    document.body.style.overflow = "";

    // pause video to stop audio and free resources
    modalVideo.pause();
    modalVideo.currentTime = 0;
}

// ==================== keyboard accessibility ====================
// close modal on escape key press for better keyboard navigation
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        if (videoModal.classList.contains("active")) {
            closeVideoModal();
        }
        if (mobileMenu.classList.contains("open")) {
            closeMobileMenu();
        }
    }
});

// ==================== close mobile menu on outside click ====================
// clicking outside the mobile menu closes it for better ux
document.addEventListener("click", function(event) {
    const isClickInsideNav = navbar.contains(event.target);
    if (!isClickInsideNav && mobileMenu.classList.contains("open")) {
        closeMobileMenu();
    }
});
