# BakeryDB - MongoDB
A bakery database comprising entities of the store, baker, and dessert. Using MongoDB

The bakery store entity will have the most properties as there will be a bakeryId, name, location, topDesserts, topBaker which will consist of their name, bakerId, specialty. The baker entity properties will be name, bakerId, bakeryId, specialty, yearsOfExperience, and topBaker. Lastly, the dessert entity will have properties of name, dessertId, type, description, rank, quantityInStore, and seasonal. The entity that contains the 1-n relationship is the bakery store entity between the bakery and the baker. All the ID properties are unique strings, with no spaces, and can consist of numbers. All the name properties are strings with no spaces. The location, topDesserts, specialty, type, and description properties are also strings. The yearsOfExperience, rank, and quanityInStore properties are numbers. The topBaker in the bakery entity and the seasonal property in the dessert entity is a boolean. 

# Bakery .JSON Object 

<img width="317" alt="Screenshot 2024-02-21 at 4 17 23 PM" src="https://github.com/thaovyvle/BakeryDB/assets/122627050/0f71efe3-18d0-4154-9e5c-beb51a5171b3">

## Routes:

  • GET /bakeries - Returns an array of bakeries.

  • POST /bakery -  Accepts a JSON object as the body of the request containing all bakery fields and saves to the database.

  • POST /bakery/:bakeryId/topDesserts - Adds a dessert to the end of the topDesserts with the given bakeryId and returns the dessertId.

  • DELETE /bakery/:bakeryID/desserts/:dessertId - Deletes the dessert with the provided dessertId on the bakery with the bakeryId.
 

# Baker .JSON Object

<img width="376" alt="Screenshot 2024-02-21 at 4 18 06 PM" src="https://github.com/thaovyvle/BakeryDB/assets/122627050/8da3c873-a128-4840-b2aa-2ed7f9353a25">

## Routes:

  • GET /bakers - Returns an array of bakers.

  • POST /baker -  Accepts a JSON object as the body of the request containing all baker fields and saves to the database.

  • POST /baker/:bakerId/topBaker - Accepts a JSON object as the body of the request, topBaker (true or false), and updates the topBaker property for the specified baker. 

  • DELETE /baker/:bakerID - Deletes the baker with the provided id.
 

# Dessert .JSON Object

<img width="510" alt="Screenshot 2024-02-21 at 4 18 23 PM" src="https://github.com/thaovyvle/BakeryDB/assets/122627050/418c8f23-d9aa-4959-8bf0-ec8684ababf8">

## Routes:

  • GET /desserts - Returns an array of desserts.

  • POST /dessert -  Accepts a JSON object as the body of the request containing all dessert fields and saves to the database.

  • POST /dessert/:dessertId/quantity - Accepts a JSON object as the body of the request, quantityInStore (number), and updates the quantityInStore property for the specified dessert.  
  • DELETE /dessert/:dessertId - Deletes the dessert with the provided id.
