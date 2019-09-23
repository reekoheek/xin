import { Expr } from '../expr';
import { Annotation } from '../annotation';
import { accessorFactory } from '../accessor';
import { pathString, pathHead } from '../../helpers';
import { LeafBinding } from './leaf';

export class Binding extends LeafBinding {
  constructor () {
    super('');

    this.model = undefined;
    this.running = false;
    this.deferredNotifications = [];
  }

  bindFunction (path, fn) {
    const annotation = new Annotation(Expr.create(path, true), accessorFactory(fn));
    this.traverse(path, true).addAnnotation(annotation);
    return annotation;
  }

  bindAnnotation (annotation) {
    if (annotation.expr.type === Expr.METHOD) {
      this.annotate(annotation.expr.fn.name, annotation);
    }

    annotation.expr.varArgs.forEach(arg => this.annotate(arg.name, annotation));
  }

  annotate (path, annotation) {
    this.notify(pathHead(path));
    this.traverse(path, true).addAnnotation(annotation);
  }

  deannotate (path, annotation) {
    this.traverse(path).removeAnnotation(annotation);
  }

  notify (path) {
    if (!this.running) {
      return this.addDeferredNotification(path);
    }

    const binding = this.traverse(path);
    if (binding) {
      binding.dispatchEffect({ model: this.model });
    }
  }

  dispose () {
    if (this.running) {
      this.stop();
    }

    super.dispose();
  }

  start (model) {
    this.running = true;
    this.model = model;
    this.deferredNotifications.forEach(path => this.notify(path));
    this.deferredNotifications = [];
  }

  stop () {
    this.running = false;
    this.model = undefined;
    this.deferredNotifications = [];
  }

  addDeferredNotification (path) {
    const pathStr = pathString(path);
    if (this.deferredNotifications.indexOf(pathStr) === -1) {
      this.deferredNotifications.push(pathStr);
    }
  }
}