const petLost = require('../../models/mascot/PetLostModel');

//function to create an pet lost post
const createLost = async (req, res) => {
  //check if images array is populated
  if (req.files) { 
    try {
      const {
        petName,
        petSpecie,
        petSize,
        petSex,
        petBreed,
        petDescription,
        petCity,
        latitude,
        longitude,
        petVaccines,
				petSterilized,
        name,
        number,
        whatsapp
      } = req.body;
      // 
			let arrPictures = []
			//stores each path element in an array
			req.files.map(async (file) => {
				arrPictures = [...arrPictures, file.path];
			});
			console.log(arrPictures)
			// 
      const newLost = new petLost({
        petData: {
					petName,
					petSpecie,
					petSize,
					petSex,
					petBreed,
					petDescription,
					petCity,	
					petLocation: {
						latitude,
						longitude
					},
          petVaccines,
          petSterilized,
					petPictures: arrPictures, //https://medium.com/@lola.omolambe/image-upload-using-cloudinary-node-and-mongoose-2f6f0723c745
				},
        petContact: {
          name,
          number,
          whatsapp
        }
      });
      // console.dir(req.headers['content-type'])
      const createdLost = await newLost.save();
      return res.status(200).json({ 
        msg: 'El post creado exitosamente.', 
        data: createdLost 
      });
    } catch (error) {
      return res.status(405).json({
        msg: 'Hubo un error al crear el post',
        error: error
      });
    }
  }
  return res.status(400).json({ 
    msg: 'No seleccionaste ningun archivo, por favor seleccione aunque sea uno.'
  });
}
//function to obtain the complete list of lost posts
const getAllLost = async (req, res) => {
  try {
		// Pagination Query
		const limit = parseInt(req.query.limit, 10) || 10;
		const page = parseInt(req.query.page, 10) || 1;
		// Options Query
		let {specie, sex} = req.query;
		let query = {};
		if (specie != null) query['petData.petSpecie'] = specie
		if (sex != null) query['petData.petSex'] = sex
		//Execute the query  
    const lostList = await petLost.paginate(query, {limit, page, sort: { 'date': 'desc' } });
    return res.status(200).json({
      msg: 'Su peticion ha sido realizada',
      data:  lostList
    });
  } catch (error) {
    return res.status(405).json({
      msg: 'Hubo un error al realizar su peticion',
      error: error
    });
  }
}
//get a post by id
const getLostById = async (req, res) => {
  try {
    const { id } = req.params;
    const lostId = await petLost.findById(id);
    return res.status(200).json({
      msg: 'Su peticion ha sido realizada',
      data:  lostId
    });
  } catch (error) {
    return res.status(405).json({
      msg: 'Hubo un error al realizar su peticion',
      error: error
    });
  }
}
//update the information of a post
const updateLost = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      petName,
      petSpecie,
      petSize,
      petSex,
      petBreed,
      petDescription,
      petCity,
      latitude,
      longitude,
      petVaccines,
      petSterilized,
      name,
      number,
      whatsapp
    } = req.body;
    let arrPictures = [ await petFound.findOne({id}).petPictures ]
		//stores each path element in an array
		// req.files.map(async (file) => {
		// 	arrPictures = [...arrPictures, file.path];
		// });
		// console.log(arrPictures)
		// 
    const lost = await petLost.findByIdAndUpdate(id, {
      petData: {
				petName,
				petSpecie,
				petSize,
				petSex,
				petBreed,
				petDescription,
				petCity,
				petLocation: {
          latitude,
          longitude
				},
        petVaccines,
				petSterilized,
        petPictures: arrPictures, //https://medium.com/@lola.omolambe/image-upload-using-cloudinary-node-and-mongoose-2f6f0723c745
			},
      petContact: {
        name,
        number
      }
    });
    const updatedLost = await lost.save();
    return res.status(200).json({ 
      msg: `Los datos de ${petName} han sido actualizados correctamente.`, 
      data: updatedLost
    });
  } catch (error) {
    return res.status(405).json({
      msg: 'Hubo un error al actualizar el post',
      error: error
    });
  }
}
//delete an adoption post
const deleteLost = async (req, res) => {
  try {
    const { id } = req.params;
    await petLost.findByIdAndDelete(id);
    const newLostList = await petLost.find();
    return res.status(200).json({ 
      msg: 'El post ha sido eliminado.', 
      data: newLostList
    });
  } catch (error) {
    return res.status(405).json({
      msg: 'Hubo un error al eliminar el post',
      error: error
    });
  }
}

module.exports = {
  createLost, 
  getAllLost,
  getLostById,
  updateLost,
  deleteLost,
}