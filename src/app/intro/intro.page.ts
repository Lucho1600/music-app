import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit{

  slideOpt = {
    initialSlide: 0, //slide inicial
    slidesPerView: 1, //slide por vista
    centeredSlides: true, //que las slides esten centradas
    speed: 400 //velocidad de transicion de casa slide en milisegundo
  }

  slides = [
    {
      title: "Titulo 1",
      subtitle: "Sub title 1",
      icon: "musical-notes-outline",
      img: "assets/images/slide1.jpg",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
    },
    {
      title: "Titulo 2",
      subtitle: "Sub title 2",
      icon: "musical-note-outline",
      img: "assets/images/slide2.jpg",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
    },
    {
      title: "Titulo 3",
      subtitle: "Sub title 3",
      icon: "play-outline",
      img: "assets/images/slide3.jpeg",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
    },
    {
      title: "Titulo 4",
      subtitle: "Cuarto Slide",
      icon: "play-outline",
      img: "assets/images/slide4.gif",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
    }
  ]

  constructor(private router: Router, private storage: Storage) { 
    this.storage.create();
  }

  ngOnInit(): void {
  }

  finish() {
    this.storage.set("isIntroShowed", true);
    this.router.navigateByUrl("/login");
  }

}
