export default function SecondComponent(){
    return(
        <div class="search-bar">
           
            <form className="form">


<input type="text" id="destination" placeholder="Entrez votre destination" required></input>

<input type="date" id="check-in" required></input>
<input type="date" id="check-out" required></input>
<input type="number" id="nmbrpersonne" placeholder="nombre des personnes" required></input>

   <a href="/SerchPage">
      <button type="button">
        Rechercher
      </button>
    </a></form>


        </div>

    )
}