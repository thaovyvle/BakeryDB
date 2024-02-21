# BakeryDB - MongoDB
A bakery database comprising entities of the store, baker, and dessert entities. Using MongoDB

The bakery store entity will have the most properties as there will be a bakeryId, name, location, topDesserts, topBaker which will consist of their name, bakerId, specialty. The baker entity properties will be name, bakerId, bakeryId, specialty, yearsOfExperience, and topBaker. Lastly, the dessert entity will have properties of name, dessertId, type, description, rank, quantityInStore, and seasonal. The entity that contains the 1-n relationship is the bakery store entity between the bakery and the baker. All the ID properties are unique strings, with no spaces, and can consist of numbers. All the name properties are strings with no spaces. The location, topDesserts, specialty, type, and description properties are also strings. The yearsOfExperience, rank, and quanityInStore properties are numbers. The topBaker in the bakery entity and the seasonal property in the dessert entity is a boolean. 

# Bakery .JSON Object 

![carbon (1)](https://github.com/thaovyvle/BakeryDB/assets/122627050/21200436-64e4-4ebb-bd54-92de6b3ffec9)

##Routes:

  • GET /bakeries - Returns an array of bakeries.

  • POST /bakery -  Accepts a JSON object as the body of the request containing all bakery fields and saves to the database.

  • POST /bakery/:bakeryId/topDesserts - Adds a dessert to the end of the topDesserts with the given bakeryId and returns the dessertId.

  • DELETE /bakery/:bakeryID/desserts/:dessertId - Deletes the dessert with the provided dessertId on the bakery with the bakeryId.
 

# Baker .JSON Object

![carbon (2)](https://github.com/thaovyvle/BakeryDB/assets/122627050/974ad349-ed79-4ad3-9488-32288b7fbf9f)

##Routes:

  • GET /bakers - Returns an array of bakers.

  • POST /baker -  Accepts a JSON object as the body of the request containing all baker fields and saves to the database.

  • POST /baker/:bakerId/topBaker - Accepts a JSON object as the body of the request, topBaker (true or false), and updates the topBaker property for the specified baker. 

  • DELETE /baker/:bakerID - Deletes the baker with the provided id.
 

# Dessert .JSON Object

![carbon (3)](https://github.com/thaovyvle/BakeryDB/assets/122627050/6df74fc9-7d0d-4913-a7b2-f14dc7c7a22d)

##Routes:

  • GET /desserts - Returns an array of desserts.

  • POST /dessert -  Accepts a JSON object as the body of the request containing all dessert fields and saves to the database.

  • POST /dessert/:dessertId/quantity - Accepts a JSON object as the body of the request, quantityInStore (number), and updates the quantityInStore property for the specified dessert.  
  • DELETE /dessert/:dessertId - Deletes the dessert with the provided id.
