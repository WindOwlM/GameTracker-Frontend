import '../../styles/card.css'

export function GameCard () {
  return(
    <>
        <div class="game_card">
          <div class="card_img"></div>
          <div class="card_text">Call Of Duty MW3</div>
          <div class="card_text main_title">
            Call of Duty Modern Warfare 3 Tournament
          </div>
          <div class="card_text main_desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos voluptatum
            iste, porro ullam reprehenderit quam hic excepturi necessitatibus
            doloremque ...
          </div>
          <div class="card_end"></div>
          <div class="card_text read_more">
            <a href="#">Read More &nbsp;<i class="fa-solid fa-arrow-right"></i></a>
          </div>
          <div class="card_text read_more date">2023-01-24 02:15</div>
        </div>
    </>
  )
}

export default GameCard