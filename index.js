'use strict';


async function getUsers() {
                    
  const response = await fetch('http://localhost:5000/api');

  const data = await response.json();

  console.log(data);
}

class clients {
	constructor() {
		const firstNameInput = document.getElementById('fname');
		const lastNameInput = document.getElementById('lname');
        const ageInput = document.getElementById('age');
        console.log(ageInput);
        const phoneInput = document.getElementById('phone');
        const submitInput = document.getElementById('submit')
        submitInput.onclick = (e) => {
            e.preventDefault();
            const firstName = firstNameInput.value;
            const lastName = lastNameInput.value;
            const age = ageInput.value;
            console.log(age);
            const phone = phoneInput.value;
            const clientInfo = firstName + lastName + age + phone;
            console.log(clientInfo);
            if (clientInfo) this._postInformation(clientInfo);
        };
      
		vyhledatInput.onclick = (e) => {
			e.preventDefault();
			const hledanyText = planetaInput.value;
			if (hledanyText) this._ziskejInformace(hledanyText);
		};
       }               

_postClient(clientInfo) {
        Ajax.post('http://localhost:5000/api/clients', { firstName, lastName, age, phone })
            .then((data) => {
                this._getClient(clientInfo); 
            })
            .catch((err) => {
                const informationDiv = document.getElementById('info');
                informationDiv.innerHTML = '<div style="height: 10px;background-color: rgb(219, 40, 40);">Vyskytl se error při odeslání dat.</div>';
            });

    }

    _getClient(clientInfo) { 
        Ajax.get('http://localhost:5000/api/clients', { firstName, lastName, age, phone })
            .then((data) => {
                // Obsluha přijatých data       
                this._writeClient(data); })
            .catch((err) => {
                const informationDiv = document.getElementById('info');
                informationDiv.innerHTML = '<div style="height: 10px;background-color: rgb(219, 40, 40);">Vyskytl se error při získávání dat.</div>';

            });
        }
      
    
    _writeClient(data) {
      const result = document.getElementById('section_table');
      result.innerHTML = "";
 if(data.results.lenght){
    for(const clientData of data.results){
      const table = document.createElement("table");
      const coption = document.createElement("h2");
      coption.innerHTML = "Pojištěnec";
      const thead = document.createElement("thead");
      thead.innerHTML = ` <tr>
     <th scope="col">Jméno a příjmeni</th>
     <th scope="col">Telefon</th>
     <th scope="col">Věk</th>
        </tr>`;
const tbody = document.createElement("tbody"); 
data.results.forEach(client => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td data-label="Jméno a příjmeni">${clientData.firstName} ${lastName} </td>
            <td data-label="Telefon">${clientData.phone} </td>
            <td data-label="Věk">${clientData.age}</td>
          `
        result.appendChild(table);
})
    }  else{
        result.innerHTML='<div>Bohužel jsme nic nenašli.</div>'

    }  
}
}}

      
    //     data.results.forEach(user => {
    //         const li = document.createElement("li");
            
    //         li.innerHTML = `
    //             // <img src="${user.picture.large}" alt="${user.name.first}">
    //             // <div class="user-information">
    //             //     <h3>${user.name.first} ${user.name.last}</h3>
    //             //     <p>${user.location.city}, ${user.location.country}</p>
    //             // </div>
    //         `
    //         result.appendChild(li);
    
    //         usersList.push(li); // bude potřebovat až dále
    
    //     });
    // }
    

// _ziskejInformace(hledanyText) {
// 		Ajax.get('https://swapi.dev/api/planets/', { search: hledanyText })
// 			.then((data) => {
// 				// Obsluha přijatých data
// 				this._vypisVysledky(data);
// 			})
// 			.catch((err) => {
// 				// Reakce, pokud se data nepodařilo přijmout
// 				const vysledkyHledani = document.getElementById('vysledky-hledani');
// 				vysledkyHledani.innerHTML = '<div>Vyskytl se error při získávání dat.</div>';
// 			});
// 	}

// 	_vypisVysledky(data) {
// 		const vysledkyHledani = document.getElementById('vysledky-hledani');
// 		vysledkyHledani.innerHTML = '';
// 		// Obsluha přijatých dat
// 		if (data.results.length) {
// 			for (const polozkaVysledku of data.results) {
// 				vysledkyHledani.innerHTML += `<div>
// 				<h3>${polozkaVysledku.name}</h3>
// 				Klima: ${polozkaVysledku.climate}<br>
// 				Počet obyvatel: ${polozkaVysledku.population}<br>
// 				Terén: ${polozkaVysledku.terrain}<br>
// 				</div>`;
// 			}
// 		} else {
// 			vysledkyHledani.innerHTML = '<div>Bohužel jsme nic nenašli.</div>';
// 		}
// 	}
// }

  
