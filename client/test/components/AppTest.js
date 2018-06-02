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

  it('contains routes', () => {
    expect(component.find('.routes')).to.exist;
  })
});
