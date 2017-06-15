var models = require('../model/pet.js');

var Pet = models.Pet;


exports.provideList = function(response) {
  Pet.find({}, function(error, result) {
    if (error) {console.error(error); return null;}

    if (result != null) {
      response.setHeader('Access-Control-Allow-Origin', '*')
      response.json(result);
    }
  });
};

exports.paginate = function(req, res) {
  Pet.paginate({},
    {page:req.query.page, limit:req.query.limit},
    function (error, pageCount, result, itemCount) {
        if(error) {
          console.log(error);
          response.writeHead('500', {'Content-Type' : 'text/plain'});
          response.end('Internal Server Error');
        }
        else {
          response.json({
            object : 'characters',
            pageCount : pageCount,
            result: result
          });
        }
    });
}

function toPet(petObject) {
	return new Pet({
    name: petObject.name,
    typeAnimal: petObject.typeAnimal,
    breed: petObject.breed,
    imageUrl: petObject.imageUrl,
    description: petObject.description,
    age: petObject.age,
    owner: petObject.owner
	});
}

exports.saveCharacter = function(request, response) {
	var pet = toPet(request.body);

	pet.save(function(error) {
				if (!error) {
					response.writeHead(201, {'Content-Type' : 'application/json'});
					response.end(JSON.stringify(request.body));
				} else {
						Pet.findOne(
              {name : pet.name},

							function(error, result) {
								console.log('Check if such a pet exists');
								if (error) {
									console.log(error);
									response.writeHead(500, {'Content-Type' : 'text/plain'});
									response.end('Internal Server Error');
								} else {
									if (!result) {
										console.log('Pet does not exist. Create new one');
										character.save();
										response.writeHead(201, {'Content-Type' : 'application/json'});
										response.end(JSON.stringify(request.body));
									} else {
										console.log('Pet already exists will be updated');

                    result.name = pet.name;
										result.typeAnimal = pet.typeAnimal;
										result.breed = pet.breed;
										result.imageUrl = pet.imageUrl;
                    result.description = pet.description;
                    result.age = pet.age;
										result.owner = pet.owner;

										result.save();
										response.json(request.body);
									}
							}
					});
				}

		});
};
