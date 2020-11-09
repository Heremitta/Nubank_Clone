import { Component, Renderer2, ViewChild } from '@angular/core';
import { Animation, AnimationController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('blocks') blocks:any;
  @ViewChild('background') background:any;
  public fixed = false
  public options: Array<any> = [
    {icon: 'person-add-outline', text: 'Indicar amigos'},
    {icon: 'phone-portrait-outline', text: 'Recarga de celular'},
    {icon: 'wallet-outline', text: 'Depositar'},
    {icon: 'options-outline', text: 'Ajustar limite'},
    {icon: 'help-circle-outline', text: 'Me ajuda'},
    {icon: 'barcode-outline', text: 'Pagar'},
    {icon: 'lock-open-outline', text: 'Bloquear cartão'},
    {icon: 'card-outline', text: 'Cartão virtual'}
  ]

  public slideOptions: any = {slidesPerView: 3, freemode:true}
  public items: Array<any> = [
    {icon: 'help-circle-outline', text: 'Me ajuda'},
    {icon: 'person-outline', text: 'Perfil'},
    {icon: 'cash-outline', text: 'Configurar conta'},
    {icon: 'card-outline', text: 'Configurar cartão'},
    {icon: 'phone-portrait-outline', text: 'Configurar dp app'}
  ]
  public inicialStep= 0
  private maxTranslate
  private animation: Animation
  constructor(
    private animationControl: AnimationController,
    private platform: Platform,
    private renderer: Renderer2
    ) {
      this.maxTranslate = this.platform.height() - 200
    }

    ngAfterViewInit(): void {
      //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      //Add 'implements AfterViewInit' to the class.
      this.createAnimation();
    }
    toogleBlocks(){
      this.inicialStep =  this.inicialStep ===0 ? this.maxTranslate: 0;

      this.animation.direction(this.inicialStep===0?'reverse':'normal').play()

      this.setBackgroundOpacity();
    }
  setBackgroundOpacity() {
    this.renderer.setStyle(this.background.nativeElement,'opacity', this.inicialStep ===0? '0': '1')
  }
  createAnimation() {
    this.animation = this.animationControl.create()
    .addElement(this.blocks.nativeElement)
    .duration(300)
    .fromTo('transform', 'translateY(0)', `translateY(${this.maxTranslate}px)`)
  }
  fixedBlocks():boolean{
    return this.inicialStep === this.maxTranslate;
  }
}
