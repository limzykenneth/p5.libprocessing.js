#![deny(clippy::all)]

use bevy::ecs::entity::Entity;
use bevy::math::Vec3;
use napi::bindgen_prelude::{Array, Object};
use napi::{Error, Result, Status};
use napi_derive::napi;
use processing::prelude::*;
use processing::processing_glfw::GlfwContext;
use processing::processing_render::render::command::DrawCommand;

struct P5Error(error::ProcessingError);
impl From<error::ProcessingError> for P5Error {
  fn from(value: error::ProcessingError) -> Self {
    Self(value)
  }
}

impl From<P5Error> for Error {
  fn from(value: P5Error) -> Self {
    Error::new(
      Status::GenericFailure,
      format!("External Error: {}", value.0),
    )
  }
}

#[napi(object)]
pub struct RendererStates {
  pub stroke_color: String,
  pub fill_color: String,
  pub rect_mode: String,
}

#[napi(js_name = "Renderer")]
pub struct Renderer {
  pub width: u32,
  pub height: u32,
  ctx: GlfwContext,
  canvas: Entity,
  graphics: Entity,
  // pub states: RendererStates
}

#[napi]
impl Renderer {
  #[napi(constructor)]
  pub fn new(p_inst: Object, width: u32, height: u32, is_main_canvas: bool) -> Self {
    let mut glfw_ctx = GlfwContext::new(width, height).unwrap();
    init(Config::default()).unwrap();
    let surface = glfw_ctx.create_surface(width, height).unwrap();
    let graphics = graphics_create(surface, width, height, TextureFormat::Rgba16Float).unwrap();

    Renderer {
      width: width,
      height: height,
      ctx: glfw_ctx,
      canvas: surface,
      graphics: graphics,
      // states: RendererStates {
      // 	stroke_color: "black".to_string(),
      // 	fill_color: "white".to_string(),
      // 	rect_mode: "center".to_string()
      // }
    }
  }

  #[napi]
  pub fn frame(&mut self) {
    self.ctx.poll_events();
  }

  #[napi]
  pub fn start_frame(&self) -> Result<()> {
    graphics_begin_draw(self.graphics).map_err(P5Error::from)?;
    Ok(())
  }

  #[napi]
  pub fn end_frame(&self) -> Result<()> {
    graphics_end_draw(self.graphics).map_err(P5Error::from)?;
    Ok(())
  }

  #[napi(js_name = "_applyDefaults")]
  pub fn apply_defaults(&self) {}

  #[napi]
  pub fn reset_matrix(&self) {}

  #[napi]
  pub fn background(&mut self, r: f64, g: f64, b: f64) -> Result<()> {
    // while self.ctx.poll_events() {
    //     graphics_begin_draw(self.graphics).map_err(P5Error::from)?;

    graphics_record_command(
      self.graphics,
      DrawCommand::Fill(bevy::color::Color::srgb(r as f32, g as f32, b as f32)),
    )
    .map_err(P5Error::from)?;

    graphics_record_command(
      self.graphics,
      DrawCommand::Rect {
        x: 0.0,
        y: 0.0,
        w: self.width as f32,
        h: self.height as f32,
        radii: [0.0, 0.0, 0.0, 0.0],
      },
    )
    .map_err(P5Error::from)?;

    //     graphics_end_draw(self.graphics).map_err(P5Error::from)?;
    // }

    Ok(())
  }

  #[napi]
  pub fn rect(&self, args: Vec<f64>) -> Result<()> {
    graphics_record_command(
      self.graphics,
      DrawCommand::Fill(bevy::color::Color::srgb(0.85, 0.3 / 24.0, 0.2)),
    )
    .map_err(P5Error::from)?;

    graphics_record_command(
      self.graphics,
      DrawCommand::Rect {
        x: (args[0] + args[2] / 2.0) as f32,
        y: (args[1] + args[3] / 2.0) as f32,
        w: args[2] as f32,
        h: args[3] as f32,
        radii: [0.0, 0.0, 0.0, 0.0],
      },
    )
    .map_err(P5Error::from)?;

    Ok(())
  }
}

// #[napi]
// pub fn background() {
// 	println!("background!!");
// }

// #[napi]
// pub fn rect() {

// }

// #[napi]
// pub fn create_canvas(width: u32, height: u32) -> Result<()> {
// 	let mut glfw_ctx = GlfwContext::new(width, height).map_err(P5Error::from)?;
// 	init(Config::default()).map_err(P5Error::from)?;
// 	let surface = glfw_ctx.create_surface(width, height).map_err(P5Error::from)?;
// 	let graphics = graphics_create(surface, width, height, TextureFormat::Rgba16Float).map_err(P5Error::from)?;
// 	let box_geo = geometry_box(100.0, 100.0, 100.0).map_err(P5Error::from)?;

// 	graphics_mode_3d(graphics).map_err(P5Error::from)?;
// 	transform_set_position(graphics, Vec3::new(100.0, 100.0, 100.0)).map_err(P5Error::from)?;
// 	transform_look_at(graphics, Vec3::new(0.0, 0.0, 0.0)).map_err(P5Error::from)?;

// 	let mut angle: f32 = 0.0;

//     while glfw_ctx.poll_events() {
//         graphics_begin_draw(graphics).map_err(P5Error::from)?;

//         graphics_record_command(
//             graphics,
//             DrawCommand::BackgroundColor(bevy::color::Color::srgb(0.1, 0.1, 0.15)),
//         ).map_err(P5Error::from)?;

//         graphics_record_command(graphics, DrawCommand::PushMatrix).map_err(P5Error::from)?;
//         graphics_record_command(graphics, DrawCommand::Rotate { angle }).map_err(P5Error::from)?;
//         graphics_record_command(graphics, DrawCommand::Geometry(box_geo)).map_err(P5Error::from)?;
//         graphics_record_command(graphics, DrawCommand::PopMatrix).map_err(P5Error::from)?;

//         graphics_end_draw(graphics).map_err(P5Error::from)?;

//         angle += 0.02;
//     }

// 	Ok(())
// }
