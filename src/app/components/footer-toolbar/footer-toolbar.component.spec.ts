import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FooterToolbarComponent } from './footer-toolbar.component';

// COMPONENTS IMPORT
import { AddButtonComponent } from './../add-button/add-button.component';

describe('FooterToolbarComponent', () => {
  let component: FooterToolbarComponent;
  let fixture: ComponentFixture<FooterToolbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterToolbarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
