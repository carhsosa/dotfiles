import math
from collections.abc import Iterable

import numpy as np
from numpy.typing import ArrayLike

from ..util.svg.color import Color
from .line import LineVisual
from .text import TextVisual
from .visual import CompoundVisual, updating_property

# -*- coding: utf-8 -*-
# -----------------------------------------------------------------------------
# Copyright (c) Vispy Development Team. All Rights Reserved.
# Distributed under the (new) BSD License. See LICENSE.txt for more info.
# -----------------------------------------------------------------------------

# XXX TODO list (see code, plus):
# 1. Automated tick direction?
# 2. Expand to 3D (only 2D supported currently)
# 3. Input validation
# 4. Property support
# 5. Reactivity to resizing (current tick lengths grow/shrink w/zoom)
# 6. Improve tick label naming (str(x) is not good) and tick selection

class AxisVisual(CompoundVisual):
    def __init__(
        self,
        pos: ArrayLike | None = None,
        domain: tuple = ...,
        tick_direction: ArrayLike = ...,
        scale_type: str = "linear",
        axis_color: tuple = ...,
        tick_color: tuple = ...,
        text_color: Color | str = "w",
        minor_tick_length: float = 5,
        major_tick_length: float = 10,
        tick_width: float = 2,
        tick_label_margin: float = 12,
        tick_font_size: float = 8,
        axis_width: float = 3,
        axis_label: str | None = None,
        axis_label_margin: float = 35,
        axis_font_size: float = 10,
        font_size: float | None = None,
        anchors: Iterable | None = None,
    ): ...
    @property
    def text_color(self): ...
    @text_color.setter
    def text_color(self, value): ...
    @property
    def axis_color(self): ...
    @axis_color.setter
    def axis_color(self, value): ...
    @property
    def axis_width(self): ...
    @axis_width.setter
    def axis_width(self, value): ...
    @property
    def tick_color(self): ...
    @tick_color.setter
    def tick_color(self, value): ...
    @property
    def tick_width(self): ...
    @tick_width.setter
    def tick_width(self, value): ...
    @property
    def tick_font_size(self): ...
    @tick_font_size.setter
    def tick_font_size(self, value): ...
    @updating_property
    def tick_direction(self): ...
    @property
    def axis_font_size(self): ...
    @axis_font_size.setter
    def axis_font_size(self, value): ...
    @updating_property
    def domain(self): ...
    @updating_property
    def axis_label(self): ...
    @updating_property
    def pos(self): ...
    @updating_property
    def minor_tick_length(self): ...
    @updating_property
    def major_tick_length(self): ...
    @updating_property
    def tick_label_margin(self): ...
    @updating_property
    def axis_label_margin(self): ...
    @property
    def _vec(self): ...
    def _update_subvisuals(self): ...
    def _prepare_draw(self, view): ...
    @property
    def _rotation_angle(self): ...
    def _compute_bounds(self, axis, view): ...

class Ticker(object):
    def __init__(self, axis: AxisVisual, anchors=None): ...
    def get_update(self): ...
    def _get_tick_positions(self, major_tick_fractions, minor_tick_fractions): ...
    def _tile_ticks(self, frac, tickvec): ...
    def _get_tick_frac_labels(self): ...

# #############################################################################
# Translated from matplotlib

class MaxNLocator(object):
    def __init__(
        self,
        nbins=10,
        steps=None,
        trim=True,
        integer=False,
        symmetric=False,
        prune=None,
    ): ...
    def bin_boundaries(self, vmin, vmax): ...
    def __call__(self): ...
    def tick_values(self, vmin, vmax): ...
    def view_limits(self, dmin, dmax): ...

def scale_range(vmin, vmax, n=1, threshold=100): ...

# #############################################################################
# Tranlated from http://www.justintalbot.com/research/axis-labeling/

# See "An Extension of Wilkinson's Algorithm for Positioning Tick Labels
# on Axes" # by Justin Talbot, Sharon Lin, and Pat Hanrahan, InfoVis 2010.

def _coverage(dmin, dmax, lmin, lmax): ...
def _coverage_max(dmin, dmax, span): ...
def _density(k, m, dmin, dmax, lmin, lmax): ...
def _density_max(k, m): ...
def _simplicity(q, Q, j, lmin, lmax, lstep): ...
def _simplicity_max(q, Q, j): ...
def _get_ticks_talbot(dmin, dmax, n_inches, density=1.0): ...
