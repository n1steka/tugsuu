import Template from "../models/product-model";

export async function handleGetRequest(req, res) {
    try {
        const data = await Template.find();
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error in GET handler:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export async function handleGetDetailRequest(req, res) {
    try {
        const { id } = req.query
        console.log(id)
        const data = await Template.findById(id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error in GET handler:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}
export async function handleGetRequestDetail(req, res) {
    try {
        const data = await Template.findById(req.params.id);
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error in GET handler:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export async function handlePostRequest(req, res) {
    try {
        const input = {
            ...req.body,
        };
        const data = await Template.create(input);

        res.status(201).json({
            success: true,
            msg: 'Post created successfully',
            data,
        });
    } catch (error) {
        console.error('Error in POST handler:', error.message);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
}


export async function handleDeleteRequest(req, res) {
    try {
        const { id } = req.query;
        const data = await Template.findByIdAndDelete(id, {
            new: true,
        });
        return res.status(200).json({
            success: true,
            msg: "Post deleted successfully",
            data: data
        })
    } catch (error) {
        console.error('Error in DELETE handler:', error.message);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }


}


export async function handlePutRequest(req, res) {
    try {
        const { id } = req.query; // Assuming the ID is part of the request parameters
        // Assuming you have a function like findByIdAndUpdate to update an existing record
        const oldData = await Template.findById(id);
        if (!oldData) {
            // Handle the case where the record with the given ID was not found
            return res.status(404).json({
                success: false,
                error: 'Record not found',
            });
        }
        const input = {
            ...req.body,
            photo: req.file ? req.file.filename : oldData.photo,
        };
        // Assuming you have a function like findByIdAndUpdate to update an existing record
        const data = await Template.findByIdAndUpdate(
            id,
            input,
            { new: true } // This option returns the modified document instead of the original
        );
        res.status(200).json({
            success: true,
            msg: 'Post updated successfully',
            data,
        });
    } catch (error) {
        console.error('Error in PUT handler:', error.message);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
}