<template>
  <nav class="principal menu-reactif" tabindex="0">
    <span class="trigger">
      <svg viewBox="0 0 256 256">
        <use xlink:href="images/icones.svg#menu" />
      </svg>
    </span>
    <ul>
      <li class="courant">
        <a href="index.html">Accueil</a>
      </li>
      <li>
        <a href="html.html">HTML</a>
      </li>
      <li>
        <a href="properties.html">
          CSS :
          <br />propriétés
        </a>
      </li>
      <li>
        <a href="selectors.html">
          CSS :
          <br />sélecteurs
        </a>
      </li>
      <li>
        <a href="javascript.html">
          Langage
          <br />Javascript
        </a>
      </li>
      <li>
        <a href="dom.html">DOM</a>
      </li>
      <li>
        <a href="events.html">Événements</a>
      </li>
      <li>
        <a href="async.html">Asynchrone</a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
#app nav.principal {
    font-size: smaller;
    order: -1;
    a {
        height: 3em;
        padding: 0 .25em;
    }

    ul {
        background-color: var(--couleur-secondaire);
        li {
            &.courant {
                background-color: rgba(0, 0, 0, .7);
                color: white;
                pointer-events: none;
            }
            &:hover {
                background-color: rgba(0, 0, 0, .1);
            }
        }
    }
    @media all and (max-aspect-ratio: 1 / 1) {
        a {
            height: 2em;
            padding: 0 1em;
        }
    }
}
.menu-reactif {
	--taille-trigger: 2em;
	line-height: 1;
    font-size: 1em;
    background-color: red;

    & > *.trigger {
        display: none;
    }

    a {
        color: inherit;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        text-align: left;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        list-style-type: none;
        flex-direction: column;
        position: absolute;
        right: 0;

        li {
            flex: 1 0 0;
        }
    }


    br {
        display: none;
    }

    & > *.trigger {
        position: absolute;
        font-size: 1rem;
        margin-top: calc(-1 * var(--taille-trigger));
        right: 0;
        width: var(--taille-trigger);
        height: var(--taille-trigger);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        fill: white;
        & > svg {
            width: 1em;
            height: 1em;
        }

        &:hover {
            background-color: rgba(255, 255, 255, .2);
        }
    }

    &:focus > .trigger {
        background-color: rgba(255, 255, 255, .5);
    }

    &:not(:focus-within) > ul {
        display: none;
    }

}
</style>

<script>
export default {
  data() {
    return {
      data: 0
    };
  },
  props: {},
  components: {}
};
</script>