import Matrix from '../math/matrix.js';
import Color from '../math/color';

export default class Text extends Matrix {
	constructor (options = {}) {
		super(options);

		let {
			visible = true,
			active = true,
			depth = 0,
			text = '',
			style = 'normal',
			variant = 'normal',
			weight = 'normal',
			size = 12,
			family = 'Arial',
			align = 'start',
			baseline = 'alphabetic',
			fill = true,
			fillColor = new Color(),
			alpha = 1,
			stroke = false,
			strokeColor = new Color(),
			strokeWidth = 1,
			shadow = false,
			shadowColor = new Color(),
			shadowBlur = 0,
			shadowOffsetX = 0,
			shadowOffsetY = 0
		} = options;

		this.visible = visible;
		this.active = active;
		this.depth = depth;

		this.text = text;
		this.style = style;
		this.variant = variant;
		this.weight = weight;
		this.size = size;
		this.family = family;
		this.align = align;
		this.baseline = baseline;
		this.fill = fill;
		this.fillColor = fillColor;
		this.alpha = alpha;
		this.stroke = stroke;
		this.strokeColor = strokeColor;
		this.strokeWidth = strokeWidth;
		this.shadow = shadow;
		this.shadowColor = shadowColor;
		this.shadowBlur = shadowBlur;
		this.shadowOffsetX = shadowOffsetX;
		this.shadowOffsetY = shadowOffsetY;
	}

	getStyle() {
		return `${this.style} ${this.variant} ${this.weight} ${this.size}px ${this.family}`;
	}

	measure (context, text = this.text) {
		context.font = this.getStyle();

		return context.measureText(text).width;
	}

	drawText (context, text, x, y) {
		context.font = this.getStyle();

		context.textAlign = this.align;
		context.textBaseline = this.baseline;

		if (this.stroke) {
			this.strokeColor.setStroke(context);
			context.lineWidth = this.strokeWidth;
			context.strokeColor(text, x, y);
		}
		if (this.fill) {
			if (this.shadow) {
				this.shadowColor.setShadow(context);
				context.shadowBlur = this.shadowBlur;
				context.shadowOffsetX = this.shadowOffsetX;
				context.shadowOffsetY = this.shadowOffsetY;
			} else {
				context.shadowBlur = 0;
				context.shadowOffsetX = 0;
				context.shadowOffsetY = 0;
			}
			this.fillColor.setFill(context);
			context.fillText(text, x, y);
		}
	}

	drawTextAlpha (context, text, x, y, apha) {
		context.globalAlpha = apha;

		this.drawText(context, text, x, y);

		context.globalAlpha = 1;
	}

	draw (context, matrix) {
		context.save();

		context.globalAlpha = this.alpha;
		matrix.setMatrixContext(context);

		this.drawText(context, this.text, 0, 0);

		context.restore();
	}

	clone () {
		return new Text({
			visible: this.visible,
			active: this.active,
			depth: this.depth,
			text: this.text,
			style: this.style,
			variant: this.variant,
			weight: this.weight,
			size: this.size,
			family: this.family,
			align: this.align,
			baseline: this.baseline,
			fill: this.fill,
			fillColor: this.fillColor.clone(),
			alpha: this.alpha,
			stroke: this.stroke,
			strokeColor: this.strokeColor.clone(),
			strokeWidth: this.strokeWidth,
			shadow: this.shadow,
			shadowColor: this.shadowColor.clone(),
			shadowBlur: this.shadowBlur,
			shadowOffsetX: this.shadowOffsetX,
			shadowOffsetY: this.shadowOffsetY
		});
	}
};
