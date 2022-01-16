nasaWomen()

function nasaWomen() {
    fetch('https://images-api.nasa.gov/search?q=women&media_type=image')
    .then(console.log('hello'))
    .then(response => response.json())
    .then(res => {
  
      const nasaImageData = [];
  
      for (const data of res.collection['items'].slice(1)) {
        nasaImageData.push(data);
      }

      console.log(nasaImageData[0], nasaImageData[1].links[0].href)

      function NasaImage(props) {

          const [likeValue, setLikeValue] = React.useState(false);

          let liked = "Not yet liked";

          if (likeValue === true) {
            liked = "Liked!";
          }
    
        return (
          <div className="image-container">
              <div className="image">
                <a href={'https://images.nasa.gov/details-' + props.nasa_id} target="_blank"><img src={props.url} alt="NASA image" /></a>
                <h2>{props.title}</h2>
                <p>{props.description}</p>
                <i>Date image created: {props.date_created}</i>
              </div>
              <div className="like-button">
                <button type="button" onClick={() => setLikeValue(!likeValue)}>
                    {liked}
                </button>
              </div>

          </div>
        );
      }
      
    function NasaImageContainer(props) {
        const nasaImages = [];
    
        for (const currentImage of nasaImageData) {
            nasaImages.push(
            <NasaImage
                title={currentImage.data[0].title}
                description={currentImage.data[0].description}
                url={currentImage.links[0].href}
                date_created={currentImage.data[0].date_created.slice(0,10)}
                nasa_id={currentImage.data[0].nasa_id}
                key={currentImage.data[0].nasa_id}
            />
            );
        }
      
        return <React.Fragment>{nasaImages}</React.Fragment>;
      }
    
    ReactDOM.render(<NasaImageContainer />, document.querySelector('#all-images'));
    })
  };

// function NasaImage(props) {
//     return (
//       <div className="image">
//         <h2>Name: {props.name}</h2>
//         <img src={props.url} alt="nasa image" />
//         <h2>Skill: {props.skill}</h2>
//       </div>
//     );
//   }
  
// function NasaImageContainer(props) {
//     const nasaImages = [];

//     for (const currentImage of nasaImageData) {
//         nasaImages.push(
//         <NasaImage
//             name={currentCard.name}
//             skill={currentCard.skill}
//             url={currentImage.imgUrl}
//             key={currentCard.cardId}
//         />
//         );
//     }
  
//     return <React.Fragment>{NasaImages}</React.Fragment>;
//   }

// ReactDOM.render(<NasaImageContainer />, document.querySelector('#all-images'));