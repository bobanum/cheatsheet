/*jslint esnext:true, browser:true */
/*globals Prism*/
class Interface {
	static load() {
		document.body.appendChild(this.dom_interface());
		this.traiterIFrames();
		this.traiterExemples();
		// this.ajouterNiveaux();
		var title = document.querySelector("div.interface > header >h1").textContent;
		title += " – " + document.querySelector("div.body > h1").textContent;
		document.title =  title;
	}
	static ajouterStyle() {
		document.currentScript.parentNode.insertBefore(this.dom_link("cheatsheet.css"), document.currentScript);
		var s = this.dom_style();
		document.currentScript.parentNode.insertBefore(s, document.currentScript);
		this.style = s.sheet;
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
	static ajouterNiveaux() {
		var elements = document.querySelectorAll("[data-n]");
		var niveaux = Object.keys(this.niveaux);
		elements.forEach(element => {
			var n = element.getAttribute("data-n");
			n = niveaux[n];
			var icone = element.insertBefore(this.dom_icone(n), element.firstChild);
			icone.classList.add("indicateur");
			icone.setAttribute("title", this.niveaux[n]);
		});
	}
	static dom_style() {
		var resultat = document.createElement("style");
		return resultat;
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
		resultat.classList.add("menu-reactif");
		resultat.classList.add("options");
		resultat.setAttribute("tabindex", "0");
		var trigger = resultat.appendChild(document.createElement("span"));
		trigger.classList.add("trigger");
		trigger.appendChild(this.dom_icone("options"));
		var liste = resultat.appendChild(document.createElement("ul"));

//		option = liste.appendChild(this.dom_option_range("importance", "Importance", "0", "3"));
		for (let k in this.niveaux) {
			option = liste.appendChild(this.dom_option_checkbox(k, this.niveaux[k], true));
			option.appendChild(this.dom_icone(k));
		}
		option = liste.appendChild(this.dom_option_checkbox("afficher-exemples", "Exemples", true));
		option.appendChild(this.dom_icone("exemples"));
		option = liste.appendChild(this.dom_option_checkbox("concis", "Concis"));
		option.appendChild(this.dom_icone("concis"));
		option = liste.appendChild(this.dom_option_checkbox("compact", "Compact"));
		option.appendChild(this.dom_icone("compact"));
		return resultat;
	}
	static dom_icone(id) {
		var resultat = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		resultat.setAttribute("viewBox", "0 0 256 256");
		// resultat.setAttribute("width", "32");
		// resultat.setAttribute("height", "32");
		var use = resultat.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "use"));
		use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "images/icones.svg#" + id);
		return resultat;
	}
	static dom_option_checkbox(id, etiquette, defaut = false) {
		var resultat;
		resultat = document.createElement("li");
		window.localStorage[id] = window.localStorage[id] || defaut;
		document.documentElement.classList.toggle(id, window.localStorage[id] === "true");
		this.style.insertRule(":root."+id+" .for-"+id+"::before{background-color: var(--couleur-coche) !important;}");
		resultat.classList.add("checkbox");
		resultat.classList.add("for-" + id);
		resultat.innerHTML = etiquette;
		resultat.addEventListener("click", () => {
			document.documentElement.classList.toggle(id);
			window.localStorage[id] = document.documentElement.classList.contains(id);
		});
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
		resultat.classList.add("menu-reactif");
		resultat.setAttribute("tabindex", "0");
		var trigger = resultat.appendChild(document.createElement("span"));
		trigger.classList.add("trigger");
		trigger.appendChild(this.dom_icone("menu"));
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
			"async.html": "Asynchrone",
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
	static traiterIFrames() {
		var iframes = Array.from(document.querySelectorAll("iframe.code"));
		iframes.forEach(iframe => {
			var txt = iframe.textContent.trim();
			var debutJunk = txt.indexOf("<!-- Code");
			if (debutJunk >= 0) {
				var finJunk = txt.indexOf("</script></body>");
				txt = txt.substr(0, debutJunk) + txt.substr(finJunk + 9);
			}
			var langage = iframe.getAttribute("data-langage") || "javascript";
			var noLines = (iframe.classList.contains("no-nos")) ? false : 1;
			var exemple = this.dom_exemple(txt, noLines, langage);
			iframe.parentNode.replaceChild(exemple, iframe);
			// iframe.parentNode.insertBefore(exemple, iframe);
			// iframe.setAttribute("src", "data:text/html;base64," + btoa(txt));
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
	static dom_exemple(data, start=1, language="javascript") {
		if (typeof data === "string") {
			data = data.split(/\r\n|\n\r|\n|\r/);
		}
		while(data.findIndex(d => d[0] !== "\t") === -1) {
			data = data.map(d => d.substr(1));
		}
		var resultat = document.createElement("pre");
		resultat.classList.add("language-" + language);
		var code = resultat.appendChild(document.createElement("code"));
		code.classList.add("language-" + language);
		if (start !== false) {
			resultat.setAttribute("data-start", start);
			resultat.classList.add("line-numbers");
			code.classList.add("line-numbers");
		}
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
		this.niveaux = {
			"fondamental": "Fondamental",
			"intermediaire": "intermédiaire",
			"avance": "Avancé",
			/* option non fournie par défaut */
			// "expert": "Expert",
		};
		if (window.location.search.match(/[?&]n=3/)) {
			this.niveaux.expert = "Expert";
		}
		this.exemples = {};
		this.ajouterStyle();
		this.ajouterPrism();
		window.addEventListener("load", () => {
			this.load();
		});
	}
}
Interface.init();
