# HUMANOSCOPE

## Overview
Projet réalisé durant un workshop inter école de l'ESAD Orléans du 21 u 24 janvier 2025. 

L’Humanoscope qui tire son nom de l’insectoscope est une expérience d'observation interactive où le joueur a la possibilité de choisir certains spécimens et d’étudier leur interactions. Ici les spécimens ne sont pas des insectes mais des personnages réels ou fictifs choisis en fonction de leur identité et de leurs style potentiel d’interaction. L’objectif était d’utiliser une IA pour incarner ces spécimens à l’aide des connaissances/prompts qu’on lui aura fournis et de reproduire certaines interactions variées, simulant ainsi une approche scientifique inspirée de l’entomologie.

Ce projet trouve son origine dans de nombreuses références comme Totally accurate battle simulator pour son gameplay, candy box et A Dark Room pour leur progression minimaliste et narrative ou encore les œuvres d’Adel Faure pour leurs aspects esthétique.

- Emmanuel Cyriaque
- Alice Massart - insta/@alima_crea
- Julie Merlet - insta @_julie_mrlt_
- Robin Moretti - robinmoretti.eu
- Thi Thuy Ha Nguyen
- Lita Shin

Documentation du process ici: https://docs.google.com/document/d/14gWOk9mozGUrZiBvhAXIp4UmNpcvh5Hr-I1jba5JWTg/edit?usp=sharing

## Technologies Used

- **JavaScript**
- **Interact.js**: For drag-and-drop functionality.
- **CSS**: For styling the `Specimens` and their containers.
- **Llama 3:** with LmStudio For language model interactions.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/RobinMoretti/specimen-interaction.git
    ```
2. Navigate to the project directory:
    ```sh
    cd specimen-interaction
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
3. Setup any model on LmStudio (tested with Llama 3) and edit LmStudio.js with your model id and api key.
    ```js
    baseUrl: "ws://192.168.33.211:5678" 
    ```

## Usage

1. Start the development server:
    ```sh
    npm start
    ```
2. Open your browser and navigate to `http://localhost:1234`.

## License

This project is licensed under the MIT License.

