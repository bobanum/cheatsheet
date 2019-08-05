/*jslint esnext:true, browser:true */
/*globals Prism*/
class Interface {
	static load() {
		
		document.body.appendChild(this.dom_interface());
		this.traiterExemples();
		var title = document.querySelector("div.interface > header >h1").textContent;
		title += " – " + document.querySelector("div.body > h1").textContent;
		document.title =  title;
	}
	static ajouterStyle() {
		document.currentScript.parentNode.insertBefore(this.dom_link("cheatsheet.css"), document.currentScript);
	}
	static ajouterPrism() {
		var link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "cheatsheet.css");
//		document.currentScript.parentNode.insertBefore(this.dom_link("https://cdnjs.cloudflare.com/ajax/libs/prism/1.16.0/themes/prism-coy.min.css"), document.currentScript);
		document.currentScript.parentNode.insertBefore(this.dom_link("https://cdnjs.cloudflare.com/ajax/libs/prism/1.16.0/themes/prism.min.css"), document.currentScript);
		document.currentScript.parentNode.insertBefore(this.dom_link("https://cdnjs.cloudflare.com/ajax/libs/prism/1.16.0/plugins/line-numbers/prism-line-numbers.css"), document.currentScript);
		document.currentScript.parentNode.insertBefore(this.dom_script("https://cdnjs.cloudflare.com/ajax/libs/prism/1.16.0/prism.js"), document.currentScript);
		document.currentScript.parentNode.insertBefore(this.dom_script("https://cdnjs.cloudflare.com/ajax/libs/prism/1.16.0/plugins/line-numbers/prism-line-numbers.js"), document.currentScript);
	}
	static dom_link(href) {
		var resultat = document.createElement("link");
		resultat.setAttribute("rel", "stylesheet");
		resultat.setAttribute("href", href);
		return resultat;
	}
	static dom_script(src) {
		var resultat = document.createElement("script");
		resultat.setAttribute("src", src);
		return resultat;
	}
	static dom_interface() {
		var resultat = document.createElement("div");
		resultat.classList.add("interface");
		resultat.appendChild(this.dom_header());
		resultat.appendChild(this.dom_footer());
		resultat.appendChild(this.dom_nav());
		resultat.appendChild(this.dom_options());
		resultat.appendChild(this.dom_body());
		return resultat;
	}
	static dom_options() {
		var resultat, option;
		resultat = document.createElement("div");
		resultat.classList.add("options");
//		option = resultat.appendChild(this.dom_option_range("importance", "Importance", "0", "3"));
		option = resultat.appendChild(this.dom_option_checkbox("afficher-exemples", "Exemples"));
		option = resultat.appendChild(this.dom_option_checkbox("concis", "Concis"));
		option = resultat.appendChild(this.dom_option_checkbox("compact", "Compact"));
		return resultat;
	}
	static dom_option_checkbox(id, etiquette, events) {
		var resultat;
		resultat = document.createElement("span");
		document.documentElement.classList.toggle(id, window.localStorage[id] === "true");
		resultat.classList.add("checkbox");
		resultat.classList.add("for-" + id);
		resultat.innerHTML = etiquette;
		if (events) {
			for (let k in events) {
				resultat.addEventListener(k, events[k]);
			}
		} else {
			resultat.addEventListener("click", () => {
				document.documentElement.classList.toggle(id);
				window.localStorage[id] = document.documentElement.classList.contains(id);
			});
		}
		return resultat;
	}
	static dom_option_range(id, etiquette, min="0", max="10", events=null) {
		var resultat, input;
		
		resultat = document.createElement("label");
		resultat.setAttribute("for", id);
		resultat.appendChild(document.createTextNode(etiquette + ":"));
		input = resultat.appendChild(document.createElement("input"));
		input.value = window.localStorage[id] || min;
		input.setAttribute("id", id);
		input.setAttribute("name", id);
		input.setAttribute("type", "range");
		input.setAttribute("min", min);
		input.setAttribute("max", max);
		
		if (events) {
			for (let k in events) {
				input.addEventListener(k, events[k]);
			}
		} else {
			input.addEventListener("change", (e) => {
				window.localStorage[e.target.id] = e.target.value;
			});
		}
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
	}
	static dom_body() {
		var body = document.createElement("div");
		body.classList.add("body");
		while (document.body.firstChild) {
			body.appendChild(document.body.firstChild);
		}
		return body;
	}
	static traiterExemples() {
		var exemples = Array.from(document.querySelectorAll(".exemple>a:only-child"));
		var promesses = exemples.map(a => {
			return this.traiterExemple(a);
		});
		Promise.all(promesses).then(() => {
			Prism.highlightAll();
		});
	}
	static traiterExemple(a) {
		return new Promise(resolve => {
			var href = a.getAttribute("href");
			a.setAttribute("target", "_blank");
			var plage = href.match(/#(?:L([0-9]+))(?:L([0-9]+))?$/);
			plage.shift();
			if (plage[0] === undefined) {
				plage = null;
			} else {
				plage[0] = parseInt(plage[0]) - 1;
				if (plage[1] === undefined) {
					plage[1] = plage[0] + 1;
				} else {
					plage[1] = parseInt(plage[1]);
				}
			}
			href = href
				.split("#")
				.slice(0,-1)
				.join("#")
				.replace("github.com", "raw.githubusercontent.com")
				.replace("/blob/", "/")
				.replace(/#.*$/, "");
			this.loadExemple(href).then(data => {
				if (plage) {
					data = data.slice(plage[0], plage[1]);
				}
				var exemple = this.dom_exemple(data, plage[0] + 1);
				a.parentNode.insertBefore(exemple, a);
				resolve(exemple);
			});
		});
	}
	static dom_exemple(data, start=1) {
		var resultat = document.createElement("pre");
		resultat.setAttribute("data-start", start);
		resultat.classList.add("language-javascript");
		resultat.classList.add("line-numbers");
		var code = resultat.appendChild(document.createElement("code"));
		code.classList.add("language-javascript");
		code.classList.add("line-numbers");
		code.textContent = data.join("\n");
		return resultat;
	}
	static loadExemple(src) {
		if (this.exemples[src]) {
			return Promise.resolve(this.exemples[src]);
		}
		return new Promise(resolve => {
			var xhr = new XMLHttpRequest();
			xhr.open("get", src);
			xhr.addEventListener("load", (e) => {
				this.exemples[src] = e.target.response.split(/\r\n|\n\r|\n|\r/);
				resolve(this.exemples[src]);
			});
			xhr.send();
		});
	}
	static init() {
		this.exemples = {};
		this.ajouterStyle();
		this.ajouterPrism();
		window.addEventListener("load", () => {
			this.load();
		});
	}
}
Interface.init();