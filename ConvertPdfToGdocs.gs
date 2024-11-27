function convertPDFsToGoogleDocs() {
  try {
    // Define the folder containing the PDFs and the destination folder
    const sourceFolderId = "1TU_IOvOENHozw5bPqFlkp1lpuqGZFEgo"; // Replace with your source folder ID
    const destinationFolderId = "1yE-3sBuNWfOB1ZTD9364VnVMVeNloy7l"; // Replace with your destination folder ID

    const sourceFolder = DriveApp.getFolderById(sourceFolderId);
    const destinationFolder = DriveApp.getFolderById(destinationFolderId);

    // Get all the PDFs in the source folder
    const pdfFiles = sourceFolder.getFilesByType(MimeType.PDF);

    // Iterate over each PDF file
    while (pdfFiles.hasNext()) {
      const pdfFile = pdfFiles.next();
      const pdfBlob = pdfFile.getBlob(); // Get the PDF as a Blob object

      // Use Drive API v3 to upload the PDF and convert it to a Google Doc
      const fileMetadata = {
        name: pdfFile.getName().replace(/\.pdf$/, ""), // Use file name without ".pdf"
        mimeType: MimeType.GOOGLE_DOCS, // Convert to Google Docs format
      };

      const convertedFile = Drive.Files.create(fileMetadata, pdfBlob, {
        convert: true,
      });

      // Move the converted file to the destination folder
      const convertedFileId = convertedFile.id;
      const file = DriveApp.getFileById(convertedFileId);
      destinationFolder.addFile(file);
      sourceFolder.removeFile(file); // Optionally remove it from the source folder

      Logger.log(`Converted and moved: ${pdfFile.getName()} to ${destinationFolder.getName()}`);
    }

    Logger.log("All PDFs converted and moved to the destination folder!");
  } catch (error) {
    Logger.log(`Error: ${error.message}`);
  }
}
