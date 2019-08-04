/*jslint esnext:true, browser:true */
class Interface {
	static load() {
		document.body.appendChild(this.dom_interface());
		var title = document.querySelector("div.interface > header >h1").textContent;
		title += " – " + document.querySelector("div.body > h1").textContent;
		document.title =  title;
	}
	static ajouterStyle() {
		var link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "cheatsheet.css");
		document.currentScript.parentNode.insertBefore(link, document.currentScript);
	}
	static dom_interface() {
		var resultat = document.createElement("div");
		resultat.classList.add("interface");
		resultat.appendChild(this.dom_header());
		resultat.appendChild(this.dom_footer());
		resultat.appendChild(this.dom_nav());
		resultat.appendChild(this.dom_body());
		return resultat;
	}
	static dom_header() {
		var resultat = document.createElement("header");
		var h1 = resultat.appendChild(document.createElement("h1"));
		h1.innerHTML = "Cheatsheet";
		return resultat;
	}
	static dom_footer() {
		var resultat = document.createElement("footer");
		resultat.innerHTML = "Cégep de Saint-Jérôme";
		return resultat;
	}
	static dom_nav() {
		var resultat = document.createElement("nav");
		resultat.setAttribute("tabindex", "0");
		var trigger = resultat.appendChild(document.createElement("span"));
		trigger.classList.add("trigger");
		// trigger.innerHTML = "≡";
		var ul = resultat.appendChild(document.createElement("ul"));
		
		
		var elements = {
			"index.html": "Accueil",
			"html.html": "HTML",
			"properties.html": "CSS : \npropriétés",
			"selectors.html": "CSS : \nsélecteurs",
			"javascript.html": "Langage \nJavascript",
			"dom.html": "DOM",
			"events.html": "Événements",
			"promise.html": "Promesses",
			"ajax.html": "Données \nexternes",
		};
		var ici = window.location.pathname.split("/").slice(-1)[0];
		if (ici === "") {
			ici = "index.html";
		}
		for (let k in elements) {
			// <li><a href="ajax.html">Données externes</a></li>
			let li = ul.appendChild(document.createElement("li"));
			if (k === ici) {
				li.classList.add("courant");
			}
			let a = li.appendChild(document.createElement("a"));
			a.setAttribute("href", k);
			a.innerHTML = elements[k].replace("\n", "<br>");
		}
		return resultat;
	// 	<nav><ul>
	// 	</ul></nav>
}
static dom_body() {
	var body = document.createElement("div");
	// 	<div class="body"></div>
		body.classList.add("body");
		while (document.body.firstChild) {
			body.appendChild(document.body.firstChild);
		}
		return body;
	}
	static init() {
		this.ajouterStyle();
		window.addEventListener("load", () => {
			this.load();
		});
	}
}
Interface.init();