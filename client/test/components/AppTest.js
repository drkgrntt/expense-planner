import { renderComponent, expect } from '../TestHelper';
import App from '../../src/components/App';

describe('App', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
  });

  it('has the correct class', () => {
    expect(component).to.have.class('app');
  });

  it('displays the header at all times', () => {
    expect(component.find('.header')).to.exist;
  });

  it('contains routes', () => {
    expect(component.find('.routes')).to.exist;
  });

  it('is wrapped in a container', () => {
    expect(component.find('.container')).to.exist;
  });
});
