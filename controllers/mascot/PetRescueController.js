const petRescue = require('../../models/mascot/PetRescueModel');

//function to create an pet rescue post
const createRescue = async (req, res) => {
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
      const newRescue = new petRescue({
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
        },
				postCreator: req.userId 
      });
      // console.dir(req.headers['content-type'])
      const createdRescue = await newRescue.save();
      return res.status(200).json({ 
        msg: 'Post creado exitosamente.', 
        data: createdRescue
      });
    } catch (error) {
			console.log(error)
      return res.status(405).json({
        msg: 'Hubo un error al crear el post',
        error: error
      });
    }
  }
  return res.status(400).json({ 
    msg: "No seleccionaste ningun archivo"
  });
}
//function to obtain the complete list of rescue posts
const getAllRescue = async (req, res) => {
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
    const rescueList = await petRescue.paginate(query, {limit, page, sort: { 'date': 'desc' } });
    return res.status(200).json({
      msg: 'Su peticion ha sido realizada',
      data:  rescueList
    });
  } catch (error) {
    return res.status(405).json({
      msg: 'Hubo un error al realizar su peticion',
      error: error
    });
  }
}
//get a post by id
const getRescueById = async (req, res) => {
  try {
    const { id } = req.params;
    const rescueId = await petRescue.findById(id).populate('postCreator');
    // console.log(rescueId)
    return res.status(200).json({
      msg: 'Su peticion ha sido realizada',
      data:  rescueId
    });
  } catch (error) {
    console.error(error)
    return res.status(405).json({
      msg: 'Hubo un error al realizar su peticion',
      error: error
    });
  }
}
//update the information of a post
const updateRescue = async (req, res) => {
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
    let arrPictures = [ await petRescue.findOne({id}).petPictures ]
		//stores each path element in an array
		// req.files.map(async (file) => {
		// 	arrPictures = [...arrPictures, file.path];
		// });
		// console.log(arrPictures)
		// 
    const rescue = await petRescue.findByIdAndUpdate(id, {
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
        petPictures: arrPictures, //https://medium.com/@lola.omolambe/image-upload-using-cloudinary-node-and-mongoose-2f6f0723c745
			},
      petContact: {
        name,
        number,
        whatsapp
      }
    });
    const updatedRescue = await rescue.save();
    return res.status(200).json({ 
      msg: `Los datos de ${petName} han sido actualizados.`, 
      data: updatedRescue
    });
  } catch (error) {
    return res.status(405).json({
      msg: 'Hubo un error al actualizar el post',
      error: error
    });
  }
}
//delete an adoption post
const deleteRescue = async (req, res) => {
  try {
    const { id } = req.params;
    await petRescue.findByIdAndDelete(id);
    const newRescueList = await petRescue.find();
    return res.status(200).json({ 
      msg: 'El post ha sido eliminado.', 
      data: newRescueList
    });
  } catch (error) {
    return res.status(405).json({
      msg: 'Hubo un error al eliminar el post',
      error: error
    });
  }
}

module.exports = {
  createRescue, 
  getAllRescue,
  getRescueById,
  updateRescue,
  deleteRescue,
}