const petAdoption = require("../../models/mascot/PetAdoptionModel");

//function to create an adoption post 
const createAdoption = async (req, res) => {
	//check if images array is populated
	if(req.files) {
		try {
			const {
				petName,
				petSpecie,
				month,
				year,
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
			console.log(req.files)
			// console.log(req.body)
			// console.log(arrPictures)
			// 
			const newAdoption = new petAdoption({
				petData: {
					petName,
					petSpecie,
					petAge: {
						month,
						year
					},
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
			const createdAdoption = await newAdoption.save();
			return res.status(200).json({
				msg: `Post creado exitosamente.`,
				data: createdAdoption,
			});
		} catch (error) {
				console.log(error)
				return res.status(405).json({
					msg: "Hubo un error al crear el post",
					error: error,
			});
		}
	}
	return res.status(400).json({ 
    msg: "No seleccionaste ningun archivo"
  });
};
//function to obtain the complete list of adoption posts
const getAllAdoption = async (req, res) => {
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
    const adoptionList = await petAdoption.paginate(  query , {limit, page, sort: { 'date': 'desc' } });
		console.log(query)
    return res.status(200).json({
      msg: "Su peticion ha sido exitosa",
      data: adoptionList,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error,
    });
  }
};
//get a post by id
const getAdoptionById = async (req, res) => {
    try {
        const { id } = req.params;
        const adoptionId = await petAdoption.findById(id);
        return res.status(200).json({
            msg: "Su peticion ha sido exitosa.",
            data: adoptionId,
        });
    } catch (error) {
        return res.status(400).json({
            msg: error,
        });
    }
};
//update the information of a post
const updateAdoption = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			petName,
			petSpecie,
			month,
			year,
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
		let arrPictures = [ await petAdoption.findOne({id}).petPictures ]
		//stores each path element in an array
		// req.files.map(async (file) => {
		// 	arrPictures = [...arrPictures, file.path];
		// });
		// console.log(arrPictures)
		// 
		const adoption = await petAdoption.findByIdAndUpdate(id, {
			petData: {
				petName,
				petSpecie,
				petAge: {
					month,
					year
				},
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
		const updatedAdoption = await adoption.save();
		return res.status(200).json({
				msg: `Los datos de ${petName} han sido actualizados.`,
				data: updatedAdoption,
		});
	} catch (error) {
		return res.status(400).json({
				msg: error,
		});
	}
};
//delete an adoption post
const deleteAdoption = async (req, res) => {
    try {
        const { id } = req.params;
        await petAdoption.findByIdAndDelete(id);
        const newAdoptionList = await petAdoption.find();
        return res.status(200).json({
            msg: "El post ha sido borrado.",
            data: newAdoptionList,
        });
    } catch (error) {
        return res.status(400).json({
            msg: error,
        });
    }
};

module.exports = {
    createAdoption,
    getAllAdoption,
    getAdoptionById,
    updateAdoption,
    deleteAdoption,
};
