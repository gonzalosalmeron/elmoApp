import { Injectable } from '@angular/core';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { UserPhoto } from 'src/app/model/user/user-photo';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photo: UserPhoto = {filepath: '', webviewPath: ''};
  private PHOTO_STORAGE: string = 'photo';
  private platform: Platform;

  constructor(platform: Platform) { 
    this.loadSaved();
    this.platform = platform;
  }

  public getPhoto() {
    return this.photo;
  }

  // AÑADE LA FOTO SELECCIONADA O TOMADA Y LA ENVIA LLAMA AL SERVICIO DE GUARDADO
  public async addProfilePhoto() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photo = savedImageFile;

    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photo),
    });
  };

  // ELIMINA LA FOTO
  async deletePhoto() {
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: undefined,
    });

    this.photo.webviewPath = '';
  }

  // GUARDA LA FOTO
  public async savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath
      };
    }
  }

  private async readAsBase64(photo: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }
  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public async loadSaved() {
    // Retrieve cached photo array data
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
    if (photoList.value != undefined) {

      if (JSON.parse(photoList.value)) {
        this.photo = JSON.parse(photoList.value);
        if (!this.platform.is('hybrid')) {
          // Display the photo by reading into base64 format
          
          // Read each saved photo's data from the Filesystem
          const readFile = await Filesystem.readFile({
              path: this.photo.filepath,
              directory: Directory.Data
          });
    
          // Web platform only: Load the photo as base64 data
          this.photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
          
        }
      }

    }
  }
}
